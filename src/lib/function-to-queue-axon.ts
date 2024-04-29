import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { merge } from 'lodash';

export type FunctionToQueuePermission = 'send' | 'consume' | 'purge';

export type FunctionToQueueAxonProps = {
  permissions?: FunctionToQueuePermission[];
};

export class FunctionToQueueAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: IFunction,
    target: Queue,
    props?: FunctionToQueueAxonProps
  ) {
    super(scope, id);
    const propsWithdefaults = merge(
      {
        permissions: ['send']
      },
      props
    );
    propsWithdefaults.permissions.forEach(
      (permission: FunctionToQueuePermission) => {
        switch (permission) {
          case 'send':
            target.grantSendMessages(source);
            break;
          case 'consume':
            target.grantConsumeMessages(source);
            break;
          case 'purge':
            target.grantPurge(source);
            break;
        }
      }
    );
  }
}
