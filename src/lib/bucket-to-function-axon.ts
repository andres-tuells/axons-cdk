import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  S3EventSourceProps,
  S3EventSourceV2
} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class BucketToFunctionAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: Bucket,
    target: IFunction,
    props: S3EventSourceProps
  ) {
    super(scope, id);
    target.addEventSource(new S3EventSourceV2(source, props));
    source.grantRead(target);
  }
}
