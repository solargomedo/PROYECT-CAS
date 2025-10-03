#!groovy
def props
// 
pipeline {
  agent {label 'docker'}
  tools {nodejs "nodejs_12.16.1"}

  parameters {
    string(name: 'JIRA_ISSUE', defaultValue: '', description: 'Ticket de Jira asociado')
  }

  triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType:'NameBasedFilter',includeBranchesSpec: "feature/*",excludeBranchesSpec: "")
  }
  environment {
    //Configuracion para desarrollo
    PROP_CONFIG_DEV='e78a0f4e-e17a-48ec-be9c-2a90aad92892'
    //Configuracion para certificacion
    PROP_CONFIG_CER='1b72cc51-da0e-43a3-9ffa-723f024daac0'
    //Configuracion para Pre Produccion
    PROP_CONFIG_PREPROD='bb52a0bd-0f12-47e7-8df1-79379ac57e89'
    //Configuracion para Produccion
    PROP_CONFIG_PROD='98522575-059f-4d51-825b-fdd15a934bc4'
    registry = "https://nexus.alemana.cl/repository/docker/"
    dockerImageDeploy = "nexus.alemana.cl/${pkgName}:${env.GIT_COMMIT}"
    pkgName = "cas-ms-master-capacitacion"
    pkgNameSonar="CAS-MS-MASTER-CAPACITACION"
    NPM_REGISTRY = "http://nexus.alemana.cl:8081/repository/npm-proxy/"
    WEBHOOK_OFFICE365 = "https://outlook.office.com/webhook/02e48213-0a7e-440d-ae53-db8d5ffe8622@9298dcf5-8f4f-4ba9-a331-6f84f599a983/JenkinsCI/bb55a5cadf024997a04fd202f6e59533/89fe3c5f-64ae-4658-9c75-b222cb4c2deb"
  }

  stages {
    stage('Checkout') {
      when {
        beforeAgent true
        anyOf {
          allOf {
            anyOf {
              branch 'master';
              branch 'develop';
            }
          };
          branch 'feature/*';
          branch 'hotfix/*';
          branch 'datafix/*';
          branch 'release/*';
        }
      }

      steps {
        checkout scm
        echo 'Pulling...'+env.GIT_BRANCH

      }
    }

    stage ('Install Modules'){
      steps{
        sh """
        npm install --registry ${NPM_REGISTRY} --verbose -d
        """
      }
    }

    stage ('test'){
      steps{
        echo 'running tests...'
        sh """
        npm run coverage
        """
      }
    }

    stage('Build Desarrollo') {
      when {
        branch 'feature/*'
      }
      steps {
          script{
            echo "Build Desarrollo..."
            sh """
            npm run build
            """
        }
      }
    }

    stage('Build Certificacion') {
      when {
        branch 'develop'
      }
      steps {
        script{
          echo "Build Certificacion..."
          sh """
          npm run build:cert
          """
        }
      }
    }

    stage('Build Pre Produccion') {
      when {
        branch 'release/*'
      }
      steps {
        script{
          echo "Build Pre Produccion..."
          sh """
          npm run build:preprod
          """
        }
      }
    }

    stage('Build Produccion') {
      when {
        branch 'master'
      }
      steps {
        script{
          echo "Build Produccion..."
          sh """
          npm run build:prod
          """
        }
      }
    }

    stage('SonarQube Analisis') {
      when {
        beforeAgent true
        anyOf {
          allOf {
            anyOf {
              branch 'master';
              branch 'develop';
            }
          };
          branch 'release/*';
          branch 'feature/*';
          branch 'hotfix/*';
          branch 'datafix/*';
        }
      }
      steps {
        script {
          def scannerHome = tool 'sonar-scanner';
          withSonarQubeEnv('sonarqube2') {
            sh "echo ${BUILD_NUMBER}"
            def branch = env.GIT_BRANCH.replace("origin/", "")
            //sh "${scannerHome}/bin/sonar-scanner -Dsonar.exclusions='**/*.test.js, /app/util/**, /app/routes/**, /app/data-access/**, **/__mocks__/**, /config/**, /*.js' -Dsonar.javascript.lcov.reportPaths='./coverage/lcov.info'  -Dsonar.host.url='http://sonar.alemana.cl' -Dsonar.login='a0e968169ecb5e004395fa41d01eec2ade943ee7' -Dsonar.projectName=$pkgName:"+branch.replace("/", "-")+ " -Dsonar.projectKey=$pkgNameSonar"
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.exclusions='**/*.test.js, /app/util/**, /app/routes/**, /app/data-access/**, **/__mocks__/**, /config/**, /*.js' -Dsonar.javascript.lcov.reportPaths='./coverage/lcov.info' -Dsonar.sources='./' -Dsonar.projectName=$pkgName:"+branch.replace("/", "-")+ " -Dsonar.projectKey=$pkgNameSonar"
            // sh "${scannerHome}/bin/sonar-scanner  -Dsonar.host.url='http://sonar.alemana.cl' -Dsonar.login='a0e968169ecb5e004395fa41d01eec2ade943ee7' -Dsonar.projectName=$pkgName:"+branch.replace("/", "-")+ " -Dsonar.projectKey=$pkgName:"+branch.replace("/", "-")+""
            sleep(time:10,unit:"SECONDS")
          }
        }
        script {
          timeout(time: 3, unit: 'MINUTES') {
            def qgate = waitForQualityGate()
            def branch = env.GIT_BRANCH.replace("origin/", "")
            if (branch != 'master') {
                if (qgate.status != 'OK') {
                  error "Pipeline aborted due to quality gate failure: ${qgate.status}"
                }
            }
          }
        }
      }
    } 

    stage('Validar') {
      when {
        beforeAgent true
        not {
          anyOf {
            allOf {
              not { environment name: 'JIRA_ISSUE', value: '' };
              anyOf {
                branch 'master';
                branch 'datafix/*';
                branch 'hotfix/*';
                
              }
            };
            branch 'develop';
            branch 'release/*';
            branch 'feature/*';
          }
        }
      }
      steps {
        script{
          currentBuild.result = 'ABORTED'
        }
        error "Pipeline no se puede ejecutar pues requiere el ticket de Jira o bien no es una rama feature";
      }
    }

    stage('Deploy Desarrollo') {
      when {
        allOf {
          anyOf {
            branch 'feature/*';
          };
        }
      }
      steps {
        script{
          echo "DESARROLLO"
          configFileProvider(
            [configFile(fileId: "${PROP_CONFIG_DEV}", variable: 'configFile')]) {
              props = readProperties file: "$configFile"
            }
            //Genera Imagen docker
            echo "######################"
            echo "## Generando Imagen ##"
            echo "######################"
            echo "                     "
            def customImage = docker.build("${pkgName}:${env.GIT_COMMIT}", "-f Dockerfile ./")
            docker.withRegistry("${registry}", 'docker-rw') {
              customImage.push("${env.GIT_COMMIT}")
              customImage.push("latest")
            }
            echo "###########################"
            echo "## Despliegue en K8S DEV ##"
            echo "###########################"
            echo "                           "
              //k8s-desa credencial global - var k8s depende del ambiente
             withKubeConfig([credentialsId: 'k8-dev-suse', serverUrl: props['k8s']]) {
              withCredentials([usernamePassword(credentialsId: 'DB_nucleodev', usernameVariable: 'bd_username', passwordVariable: 'bd_password')]) { 
                sh '''
                cat <<EOF > cas-nucleo-digital-env-vars.yaml
                apiVersion: v1
                kind: Secret
                metadata:
                  name: cas-nucleo-digital-env-vars
                  namespace: cas-nucleo-digital
                stringData:
                  DB_USER_ESQUEMA: $bd_username
                  DB_PASS_ESQUEMA: $bd_password
                '''
                  sh 'kubectl -n cas-nucleo-digital apply -f cas-nucleo-digital-env-vars.yaml' 
              }
              sh "kubectl cluster-info"
              sh '''
              set +x
              echo "Verificando k8s"
              echo "Actualizando contenedor"
              kubectl -n cas-nucleo-digital set image deployment/${pkgName} ${pkgName}=${dockerImageDeploy}
              '''
            }  
          }
        }
      }

      stage('Deploy Certificacion') {
        when {
          allOf {
            anyOf {
              branch 'develop';
            };
          }
        }
        steps {
          script{
            echo "CERTIFICACION"
            echo JIRA_ISSUE
            configFileProvider(
              [configFile(fileId: "${PROP_CONFIG_CER}", variable: 'configFile')]) {
                props = readProperties file: "$configFile"
              }
              //Genera Imagen docker
              echo "######################"
              echo "## Generando Imagen ##"
              echo "######################"
              echo "                      "
              def customImage = docker.build("${pkgName}:${env.GIT_COMMIT}", "-f Dockerfile ./")
              docker.withRegistry("${registry}", 'docker-rw') {
                customImage.push("${env.GIT_COMMIT}")
                customImage.push("latest")
              }
              echo "###########################"
              echo "## Despliegue en K8S CER ##"
              echo "###########################"
              echo "                           "
                //k8s-cer credencial global - var k8s depende del ambiente
                withKubeConfig([credentialsId: 'k8-cert-suse', serverUrl: props['k8s']]) {
                  withCredentials([usernamePassword(credentialsId: 'nucleo_cert', usernameVariable: 'bd_username', passwordVariable: 'bd_password')]) { 
                  sh '''
                  cat <<EOF > cas-nucleo-digital-env-vars.yaml
                apiVersion: v1
                kind: Secret
                metadata:
                  name: cas-nucleo-digital-env-vars
                  namespace: cas-nucleo-digital
                stringData:
                  DB_USER_ESQUEMA: $bd_username
                  DB_PASS_ESQUEMA: $bd_password
                '''
                  sh 'kubectl -n cas-nucleo-digital apply -f cas-nucleo-digital-env-vars.yaml' 
                }
               sh "kubectl cluster-info"
              sh '''
              set +x
              echo "Verificando k8s"
              echo "Actualizando contenedor"
              kubectl -n cas-nucleo-digital set image deployment/${pkgName} ${pkgName}=${dockerImageDeploy}
              '''
              }
            }
          }
        }

        stage('Deploy Pre Produccion') {
        when {
          allOf {
            anyOf {
              branch 'release/*';
            };
          }
        }
        steps {
          script{
            echo "PREPRODUCCION"
            echo JIRA_ISSUE
            configFileProvider(
              [configFile(fileId: "${PROP_CONFIG_PREPROD}", variable: 'configFile')]) {
                props = readProperties file: "$configFile"
              }
              //Genera Imagen docker
              echo "######################"
              echo "## Generando Imagen ##"
              echo "######################"
              echo "                      "
              def customImage = docker.build("${pkgName}:${env.GIT_COMMIT}", "-f Dockerfile ./")
              docker.withRegistry("${registry}", 'docker-rw') {
                customImage.push("${env.GIT_COMMIT}")
                customImage.push("latest")
              }
              echo "###########################"
              echo "## Despliegue en K8S PREPROD ##"
              echo "###########################"
              echo "                           "
                //k8s-cer credencial global - var k8s depende del ambiente
                withKubeConfig([credentialsId: 'k8-preprod-suse', serverUrl: props['k8s']]) {
                withCredentials([usernamePassword(credentialsId: 'nucleo_preprod', usernameVariable: 'bd_username', passwordVariable: 'bd_password')]) { 
                  sh '''
                  cat <<EOF > cas-nucleo-digital-env-vars.yaml
                apiVersion: v1
                kind: Secret
                metadata:
                  name: cas-nucleo-digital-env-vars
                  namespace: cas-nucleo-digital
                stringData:
                  DB_USER_ESQUEMA: $bd_username
                  DB_PASS_ESQUEMA: $bd_password
                '''
                  sh 'kubectl -n cas-nucleo-digital apply -f cas-nucleo-digital-env-vars.yaml' 
                }
               sh "kubectl cluster-info"
              sh '''
              set +x
              echo "Verificando k8s"
              echo "Actualizando contenedor"
              kubectl -n cas-nucleo-digital set image deployment/${pkgName} ${pkgName}=${dockerImageDeploy}
              '''
              }
            }
          }
        }

        stage('Deploy Prod') {
          when {
            allOf {
              not { environment name: 'JIRA_ISSUE', value: '' };
              anyOf {
                branch 'master';
              };
            }
          }
          steps {
            script{
              echo "PRODUCCION"
              echo JIRA_ISSUE
              configFileProvider(
                [configFile(fileId: "${PROP_CONFIG_PROD}", variable: 'configFile')]) {
                  props = readProperties file: "$configFile"
                }
                //Genera Imagen docker
                echo "######################"
                echo "## Generando Imagen ##"
                echo "######################"
                echo "                      "
                def customImage = docker.build("${pkgName}:${env.GIT_COMMIT}", "-f Dockerfile ./")
                docker.withRegistry("${registry}", 'docker-rw') {
                  customImage.push("${env.GIT_COMMIT}")
                  customImage.push("latest")
                }
                echo "############################"
                echo "## Despliegue en K8S PROD ##"
                echo "############################"
                echo "                           "
                  //k8s-prod credencial global - var k8s depende del ambiente
                  withKubeConfig([credentialsId: 'k8-prod', serverUrl: props['k8s']]) {
                    withCredentials([usernamePassword(credentialsId: 'nucleo_prod', usernameVariable: 'bd_username', passwordVariable: 'bd_password')]) { 
                      sh '''
                      cat <<EOF > cas-nucleo-digital-env-vars.yaml
                        apiVersion: v1
                        kind: Secret
                        metadata:
                          name: cas-nucleo-digital-env-vars
                          namespace: cas-nucleo-digital
                        stringData:
                          DB_USER_ESQUEMA: $bd_username
                          DB_PASS_ESQUEMA: $bd_password
                        '''
                        sh 'kubectl -n cas-nucleo-digital apply -f cas-nucleo-digital-env-vars.yaml' 
                    }
                  sh "kubectl cluster-info"
                  sh '''
                  set +x
                  echo "Verificando k8s"
                  echo "Actualizando configmap"
                  kubectl create configmap ${pkgName} --from-env-file=environment/prod.properties --dry-run -o yaml | kubectl apply -f -
                  echo "Actualizando contenedor"
                  kubectl set image deployment/${pkgName} ${pkgName}=${dockerImageDeploy}
                  '''
                }
              }
            }
          }
      }
      post {
        always {
          cleanWs()
        }
        success {
              echo 'Finalizado con exito'
              office365ConnectorSend message: 'success - Finalizado con exito', status: 'success', webhookUrl: "${WEBHOOK_OFFICE365}"
          }
          unstable {
              echo 'Algun paso del pipeline ha fallado.'
              office365ConnectorSend message: 'unstable - Algun paso del pipeline ha fallado', status: 'unstable', webhookUrl: "${WEBHOOK_OFFICE365}"
          }
          failure {
              echo 'El pipeline ha fallado.:'
              office365ConnectorSend message: 'failure - El pipeline ha fallado.', status: 'failure', webhookUrl: "${WEBHOOK_OFFICE365}"
          }
          aborted {
              echo 'Algo ha cambiado en el repositorio.'
              office365ConnectorSend message: 'aborted - Algo ha cambiado en el repositorio.', status: 'aborted', webhookUrl: "${WEBHOOK_OFFICE365}"
          }
      }
    }

