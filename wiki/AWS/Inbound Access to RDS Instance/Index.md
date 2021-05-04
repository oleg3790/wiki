### Overview
When you create an RDS instance, by default you wont be able to connect to it until you add an inbound security group rule from your machine.

1. Find the security group that's associated with the VPC (usually if you navigate to the RDS instance description page in the AWS console, it will show you the associated security group)
2. Go to inbound rules
3. Add a rule from your RDS instance (ex. PostgresSQL protocol TCP 5432) to source: Your IP (if you choose "my ip" from the AWS console, the UI will pre-populate the source with your IP)
4. Connect to the RDS instance