import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { merge } from 'lodash';

export type FunctionToTablePermission =
  | 'full-access'
  | 'read-data'
  | 'write-data';

export type FunctionToTableAxonProps = {
  permissions?: FunctionToTablePermission[];
  tableEnvironmentVariableName?: string;
};

export class FunctionToTableAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: LambdaFunction,
    target: Table,
    props?: FunctionToTableAxonProps
  ) {
    super(scope, id);
    const propsWithdefaults = merge(
      {
        permissions: ['full-access'],
        tableEnvironmentVariableName: 'TABLE_NAME'
      },
      props
    );
    source.addEnvironment(
      propsWithdefaults.tableEnvironmentVariableName,
      target.tableName
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
