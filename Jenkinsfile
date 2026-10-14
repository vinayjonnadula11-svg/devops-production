pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/vinayjonnadula11-svg/devops-production.git'
            }
        }

       stage('Docker Check') {
    steps {
        powershell '''
            & "C:\\Users\\jonna\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" version

            if ($LASTEXITCODE -ne 0) {
                throw "Docker is not accessible from Jenkins"
            }
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
