import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  DynamoEventSource,
  DynamoEventSourceProps
} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Construct } from 'constructs';

export class TableToFunctionAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: Table,
    target: IFunction,
    props?: DynamoEventSourceProps
  ) {
    super(scope, id);
    target.addEventSource(new DynamoEventSource(source, props));
    source.grantStreamRead(target);
  }
}
