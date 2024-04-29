import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { merge } from 'lodash';

export type FunctionToBucketPermission =
  | 'read'
  | 'readwrite'
  | 'write'
  | 'delete';

export type FunctionToBucketAxonProps = {
  permissions?: FunctionToBucketPermission[];
  bucketEnvironmentVariableName?: string;
};

export class FunctionToBucketAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: LambdaFunction,
    target: Bucket,
    props?: FunctionToBucketAxonProps
  ) {
    super(scope, id);
    const propsWithdefaults = merge(
      {
        permissions: ['readwrite'],
        bucketEnvironmentVariableName: 'BUCKET_NAME'
      },
      props
    );
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
}
