# Overview
If you are using Azure DevOps to create CI/CD pipelines for your applications, you might want to host your own agents. Self-hosted agents gives you more control of any dependencies that your builds might require. 

### Requirements
- AWS account
- Azure DevOps account and organization created

## Steps Involved
1. Generate Azure DevOps Personal Access Token (PAT) - (Used to authenticate agent to DevOps organization)
1. Obtain base Dockerfile and start script from [Microsoft docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/docker?view=azure-devops)
1. (optional) Customize Dockerfile (install any necessary build tools)
1. Create an AWS Elastic Container Registry (ECR) repository
1. Locally build agent Docker image
1. Tag and push agent Docker image to AWS ECR
1. Create an AWS Elastic Container Service (ECS) cluster
1. Create an AWS ECS Task Definition (for running container from agent Docker image)
1. Run AWS ECS task from newly created definition

## Implementation Instructions
*Note: these instructions document how to create AWS resources via console - typically in an enterprise setting you might want to script out infrastructure creation (Terraform or similar) out any resources. That being said you can still use this document as a reference for the resources you will need to provision by script* 

To start, we will need to generate a personal access token in Azure DevOps. This will allow us to authenticate the agent to our Azure DevOps organization. Follow the steps in the document below to do this:

https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page

Save your PAT as you will need to pass it to the agent container. 

Now, use the below Microsoft docs to copy and locally create the Dockerfile and start script for the agent depending on which type of container you will be running (Windows or Linux)

https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/docker?view=azure-devops

You can customize the Dockerfile and add any build or release tools that your pipelines might need (AWS CLI, code repo tools, etc.)

Open up the AWS console and search for the **Elastic Container Registry**. Once found, create a repository (private, if you would like to make sure no one random on the web can access it). If you are new to Docker, AWS provides the necessary commands needed to authenticate the Docker client to the ECR repo and push the docker image.

You will need to install the [AWS Powershell toolkit](https://aws.amazon.com/powershell/) to be able to authenticate the Docker client to the ECR repo, if you don't have it on your machine already.

Now build and tag the agent Docker image locally and then push the image to the AWS ECR repo your created (reference the ECR push commands if you have to)

Once the Docker image is in the ECR repo, we will need to create the AWS Elastic Container Service cluster and task definition to run a container from the image.

In the AWS console, search for ECS and navigate to the container services page. Click on clusters and select to create a new cluster. You will need to choose a workload type or template to use. You can reference [this article](https://containersonaws.com/introduction/ec2-or-aws-fargate/) to help you figure out which one would be most appropriate for you. Usually if the workload is small, Fargate would be more then enough.

Once your cluster is setup, we just need to create a task definition to provide instructions for how to run your agent container.

On the ECS page, you should see a task definitions link where you can define a definition. Add a new definition, and configure it with a task role that will allow you to access any AWS resources that the agent might require (ex. for uploading to S3 you will need to add S3 write/full permissions to the role). Once you get to the container addition section, select to add a new one, configure it with a name and in the image section, add the ECR repo link to the agent Docker image you uploaded.

The agent start script requires that you pass a couple of arguments in the form of environment variables when starting up the container. Make sure to add the appropriate environment variables to the task definition:

- AZP_URL - URL of your Azure DevOps organization
- AZP_TOKEN - PAT token generated via your DevOps organizational settings
- AZP_POOL - If not specified it will default to the **Default** pool, otherwise you can create your own pool via the Azure DevOps console
- AZP_AGENT_NAME - If not specified it will default to the container's host name, otherwise you can provide your own name.

To test and make sure your task definition works you can go into you ECS cluster and navigate to tasks >> Run a task >> then configure the task from the task definition you created. It will take a bit for the container to start up, open up the Azure DevOps Agent Pool settings, navigate to the agent pool you used, and you should see an agent that is online under the agents tab.

To provision a long-running instance of your task, create an ECS service that runs your task.