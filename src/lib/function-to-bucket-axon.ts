import { IFunction } from 'aws-cdk-lib/aws-lambda';
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
};

export class FunctionToBucketAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: IFunction,
    target: Bucket,
    props: FunctionToBucketAxonProps
  ) {
    super(scope, id);
    const propsWithdefaults = merge(
      {
        permissions: ['send']
      },
      props
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
