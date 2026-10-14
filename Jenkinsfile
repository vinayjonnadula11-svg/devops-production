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
                    docker version

                    if ($LASTEXITCODE -ne 0) {
                        throw "Docker is not accessible from Jenkins"
                    }
                '''
            }
        }
    }
}
