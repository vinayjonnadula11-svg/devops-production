
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/vinayjonnadula11-svg/devops-production.git'
            }
        }

        stage('Verify Files') {
            steps {
                powershell '''
                    if (!(Test-Path "app.js")) {
                        throw "app.js not found"
                    }

                    if (!(Test-Path "dockerfile")) {
                        throw "dockerfile not found"
                    }

                    if (!(Test-Path "myapp/Chart.yaml")) {
                        throw "Helm Chart.yaml not found"
                    }

                    Write-Host "All required files found."
                '''
            }
        }

        stage('Docker Check') {
            steps {
                powershell '''
                    $docker = "C:\\Users\\jonna\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe"

                    if (!(Test-Path $docker)) {
                        throw "Docker executable not found"
                    }

                    & $docker version

                    if ($LASTEXITCODE -ne 0) {
                        throw "Docker Engine is not accessible from Jenkins"
                    }
                '''
            }
        }

        stage('Docker Build') {
            steps {
                powershell '''
                    $docker = "C:\\Users\\jonna\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe"

                    & $docker build -t vinay0650/devops-production-app:1.0.0 -f dockerfile .

                    if ($LASTEXITCODE -ne 0) {
                        throw "Docker image build failed"
                    }
                '''
            }
        }

     
stage('Docker Hub Push') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-creds',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_TOKEN'
            )
        ]) {
            powershell '''
                $ErrorActionPreference = "Stop"
                $docker = "C:\\Users\\jonna\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe"

                if ([string]::IsNullOrWhiteSpace($env:DOCKER_USER)) {
                    throw "Docker Hub username is empty"
                }

                if ([string]::IsNullOrWhiteSpace($env:DOCKER_TOKEN)) {
                    throw "Docker Hub token is empty"
                }

                $env:DOCKER_TOKEN.Trim() | & $docker login --username $env:DOCKER_USER --password-stdin

                if ($LASTEXITCODE -ne 0) {
                    throw "Docker Hub login failed. Check the Jenkins credential."
                }

                & $docker push "vinay0650/devops-production-app:1.0.0"

                if ($LASTEXITCODE -ne 0) {
                    throw "Docker Hub push failed."
                }
            '''
        }
    }
}
