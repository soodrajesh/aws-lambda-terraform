# AWS Lambda Web App with Terraform

This project sets up a simple web application using AWS Lambda and API Gateway, all provisioned with Terraform.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) (v1.0.0 or later)
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate credentials
- [Node.js](https://nodejs.org/) (v14.x or later) - for packaging the Lambda function

## Project Structure

- `main.tf` - Main Terraform configuration
- `index.js` - Lambda function code
- `package.json` - Node.js dependencies and scripts
- `README.md` - This file

## Deployment Instructions

1. **Package the Lambda function**
   ```bash
   npm install
   npm run package
   ```

2. **Initialize Terraform**
   ```bash
   terraform init
   ```

3. **Review the execution plan**
   ```bash
   terraform plan
   ```

4. **Deploy the infrastructure**
   ```bash
   terraform apply
   ```
   Type `yes` when prompted to confirm the deployment.

5. **Access your web app**
   After deployment completes, Terraform will output the API Gateway endpoint URL. You can access your web app by opening this URL in a web browser.

## Endpoints

- `GET /` - Homepage with a welcome message
- `GET /api/hello` - Sample API endpoint that returns a JSON response

## Cleaning Up

To avoid incurring unnecessary charges, destroy the infrastructure when you're done:

```bash
terraform destroy
```
Type `yes` when prompted to confirm the destruction.

## Customization

- Update the AWS region in `main.tf` if needed
- Modify the Lambda function code in `index.js` to add more routes and functionality
- Add environment variables in the `aws_lambda_function` resource in `main.tf`

## License

This project is open source and available under the [MIT License](LICENSE).
