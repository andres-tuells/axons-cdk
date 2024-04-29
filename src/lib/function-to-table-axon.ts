import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { merge } from 'lodash';

export type FunctionToTablePermission =
  | 'full-access'
  | 'read-data'
  | 'write-data';

export type FunctionToTableAxonProps = {
  permissions?: FunctionToTablePermission[];
};

export class FunctionToTableAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: IFunction,
    target: Table,
    props?: FunctionToTableAxonProps
  ) {
    super(scope, id);
    const propsWithdefaults = merge(
      {
        permissions: ['send']
      },
      props
    );
    propsWithdefaults.permissions.forEach(
      (permission: FunctionToTablePermission) => {
        switch (permission) {
          case 'full-access':
            target.grantFullAccess(source);
            break;
          case 'read-data':
            target.grantReadData(source);
            break;
          case 'write-data':
            target.grantReadWriteData(source);
            break;
        }
      }
    );
  }
}
