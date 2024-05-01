import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  DynamoEventSource,
  DynamoEventSourceProps
} from 'aws-cdk-lib/aws-lambda-event-sources';

export function tableToFunction(
  source: Table,
  target: IFunction,
  props?: DynamoEventSourceProps
): void {
  target.addEventSource(new DynamoEventSource(source, props));
  source.grantStreamRead(target);
}
