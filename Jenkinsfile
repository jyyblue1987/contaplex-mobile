node {

   // Mark the code checkout 'stage'....
   stage 'Checkout'

      // Get the code
      checkout scm

   // Mark the code build 'stage'....
   stage 'Build'

      // Run the maven build
      try {
            notifyBuild('STARTED')
            sh "/mnt/docker/build_contaplex_mobile.sh ${env.WORKSPACE}"
            step([$class: 'ArtifactArchiver', artifacts: '**/platforms/android/build/outputs/apk/*.apk', fingerprint: true])
      }
      catch (e) {
         // If there was an exception thrown, the build failed
         currentBuild.result = "FAILED"
         throw e
      }
      finally {
         // Success or failure, always send notifications
         notifyBuild(currentBuild.result)
      }
}

def notifyBuild(String buildStatus = 'STARTED') {

  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def summary = "${env.JOB_NAME} - Build ${env.BUILD_NUMBER} STARTED"

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
    //summary= "${env.JOB_NAME} - Build ${env.BUILD_NUMBER} STARTED"
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
    summary= "${env.JOB_NAME} - New build available at http://babbage.blitzit.com.ar/jenkins-builds/contaplex-mobile/builds/${env.BRANCH_NAME}/${env.BUILD_NUMBER}/android-debug.apk"
  } else {
    color = 'RED'
    colorCode = '#FF0000'
    summary= "${env.JOB_NAME} - Build ${env.BUILD_NUMBER} failed"
  }

  // Send notification
  slackSend (color: colorCode, channel: "app-cuentas-corr-dev", token: "3iaiT1lGJcWKNKtx833Kk8Np", message: summary)
}
