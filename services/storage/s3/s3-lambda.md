# Amazon S3 Object Lambda

Amazon S3 Object Lambda allows users to add custom code to process and transform data when retrieving it from S3. This means that applications can retrieve and modify the data dynamically without the need to create additional storage copies. By integrating AWS Lambda functions with S3 GET requests, users can filter, format, or customize the data on the fly before it’s returned to the application, enabling more flexible and efficient data handling. To do this, a Lambda function must be configured to process the data based on parameters, such as the object’s key (file name) and bucket details.

<img width="1171" height="844" alt="image" src="https://github.com/user-attachments/assets/7aeb3beb-03e7-4ece-b849-53290ee9eef5" />
