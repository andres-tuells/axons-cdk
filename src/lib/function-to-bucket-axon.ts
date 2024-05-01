import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';

export type FunctionToBucketPermission =
  | 'read'
  | 'readwrite'
  | 'write'
  | 'delete';

export type FunctionToBucketAxonProps = {
  permissions?: FunctionToBucketPermission[];
  bucketEnvironmentVariableName?: string;
};

export function functionToBucket(
  source: LambdaFunction,
  target: Bucket,
  props?: FunctionToBucketAxonProps
) {
  const propsWithdefaults = {
    permissions: ['readwrite'],
    bucketEnvironmentVariableName: 'BUCKET_NAME',
    ...props
  };
  source.addEnvironment(
    propsWithdefaults.bucketEnvironmentVariableName,
    target.bucketName
  );
  propsWithdefaults.permissions.forEach(
    (permission: FunctionToBucketPermission) => {
      switch (permission) {
        case 'read':
          target.grantRead(source);
          break;
        case 'readwrite':
          target.grantReadWrite(source);
          break;
        case 'write':
          target.grantWrite(source);
          break;
        case 'delete':
          target.grantDelete(source);
          break;
      }
    }
  );
}
