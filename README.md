# Deploying a Node.js API and Mysql Docker images to Multicontainer app in Azure App Services through CI/CD

## Overview

A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.

This lab outlines the process to build custom Docker image of a [**Node.js**](https://docs.docker.com/language/nodejs/) application, push the image to a private repository in [Azure Container Registry](https://azure.microsoft.com/en-in/services/container-registry/) (ACR). These images will be used to deploy a multicontainer app in the **Azure App Service** (Linux) using Azure DevOps.

The Web App for Containers allows the creation of custom [Docker](https://www.docker.com/what-docker) container images, easily deploy and then run them on Azure. Combination of Azure DevOps and Azure integration with Docker will enable the following:

1. Build custom Docker images using [Azure DevOps Hosted Linux agent](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=vsts)

1. Push and store the Docker images in a private repository

1. Deploy and run the images on Azure App Services


## Setting up the Environment

1. The following resources needs to be configured for this lab:

   * Azure Container Registry

   * Azure Web App for Containers

2. **Create Azure Container Registry:**
    
    1. Create a Resource Group. Replace `<region>` with the region of your choosing, for example eastus.
        
       ![ACR](Screenshots/017-CreateContainerRegistry.png)
        
    2. Create ACR( Azure Container Registry).

       ![ACR](Screenshots/018-ClickCreate.png)

    3. djwdkdokodo.

       ![ACR](Screenshots/019-EnableAdminUser.png)

    {% include important.html content= "Enter a unique ACR name. ACR name may contain alpha numeric characters only and must be between 5 and 50 characters" %}

3. **Create Azure Web App for Containers**:
   
   1. Create a Linux App Service Plan:
      
      ![ACR](Screenshots/020-CreateAppServices..png)

   2. Create a custom Docker container Web App: To create a web app and configuring it to run a custom Docker container, run the following command:

      ![ACR](Screenshots/021-SelectDockerCompose.png)

   3. click create

      ![ACR](Screenshots/022-ClickCreate.png)


5. Navigate back to the resource group. Click on the container registry and make a note of the server details under the header **Login server**. These details will be required in the Exercise 2.

   ![ACR](images/getacrserver.png)

## Exercise 1: Configure Continuous Integration (CI)

Now that the required resources are provisioned, the **Build** and the **Release** definition need to be manually configured with the new information.

1. Navigate to the [Azure DevOps](https://dev.azure.com/RegentQuality/) and select the Competence evenings project.

   ![SelectProject](Screenshots/001-SelectProject.png)
   
1. Select Repos and click import a repository.

   ![Tasks](Screenshots/002-SelectRepos.png)

1. Enter clone URL and click Import

   ![Tasks](Screenshots/003-EnterCloneURL.png)

1. Select Pipelines and Library.

   ![Tasks](Screenshots/004-SelectPipelinesLibrary.png)

1. Select new variable group.

   ![Tasks](Screenshots/005-SelectVariableGroup.png)

1. Click on the Variables section, update the ACR details and the SQLserver details with the details noted earlier while the configuration of the environment and click on the Save button.

   ![Tasks](Screenshots/006-EnterVariableGroupNames.png)

1. Select project Settings.

   ![Tasks](Screenshots/007-SelectProjectSettings.png)

1. Select Service Connections.

   ![Tasks](Screenshots/008-SelectServiceConnections.png)

1. Select Docker Registry.

   ![Tasks](Screenshots/009-SelectDockerRegistry.png)

1. Enter details and click save.

   ![Tasks](Screenshots/010-EnterDetailsAndClickSave.png)

1. select pipeline and new pipeline.

   ![Tasks](Screenshots/011-SelectPipelineAndNewPipeline.png)

1. select Azure repos

   ![Tasks](Screenshots/012-SelectAzureReposGit.png)

1. select regent-tech-demo repo.

   ![Tasks](Screenshots/013-SelectRegenttechdemoRepo.png)

1. select existing azure pipelines yaml file.

   ![Tasks](Screenshots/014-SelectAzurePipelineYamlFile.png)

1. select branch path and continue.

   ![Tasks](Screenshots/015-SelectBranchPathContinue.png)

1. Click Run.

   ![Tasks](Screenshots/016-ClickRun.png)

1. The Build will generate and push the docker image of the web application to the Azure Container Registry. Once the build is completed, the build summary will be displayed.

   ![Tasks](Screenshots/pushbuild5.png)


## Exercise 2: Configure Continuous Delivery (CD)


1. Navigate to the Azure Portal and click on the App Service that was created at the beginning of this lab. Select the Container Settings option and provide the information as suggested and then click the Save button.

   ![Tasks](Screenshots/pushbuild5.png)

1. Navigate back to the Azure Portal and click on the Overview section of the App Service. Click on the link displayed under the URL field to browse the application and view the changes.

   ![Tasks](Screenshots/pushbuild5.png)

![012-ClickRun.png](/.attachments/012-ClickRun-d0c8ea20-5174-4db5-9f0e-1de40e0fb540.png)

1. Use the credentials **Username**: `user` and **Password**: `P2ssw0rd@1` to login to the **HealthClinic** web application.

## Summary

With **Azure DevOps** and **Azure**, we have configured a dockerized application by leveraging docker capabilities enabled on Azure DevOps Ubuntu Hosted Agent.
