import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Stream } from "aws-cdk-lib/aws-kinesis";
import { CfnDeliveryStream } from "aws-cdk-lib/aws-kinesisfirehose";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export type CompressionFormat = 'UNCOMPRESSED' | 'GZIP' | 'ZIP' | 'Snappy';

export type StreamToBucketProps = {
  prefix?: string,
  errorOutputPrefix?: string,
  bufferingHints?: CfnDeliveryStream.BufferingHintsProperty, 
  compressionFormat?: CompressionFormat,
}
export class StreamToBucket extends Construct {

  readonly firehoseDeliveryStream: CfnDeliveryStream;

  constructor(scope: Construct, id: string, source: Stream, target: Bucket, props?: StreamToBucketProps) {
    super(scope, id);

    const propsWithDefaults = {
      prefix: 'raw-data/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/hour=!{timestamp:HH}/',
      errorOutputPrefix: 'raw-data/errors/',
      bufferingHints: {
        intervalInSeconds: 60,
        sizeInMBs: 5
      },
      compressionFormat: 'UNCOMPRESSED',
      ...props,
    }

    const firehoseRole = new Role(this, 'FirehoseRole', {
      assumedBy: new ServicePrincipal('firehose.amazonaws.com')
    });

    source.grantRead(firehoseRole);
    target.grantReadWrite(firehoseRole);

    // Create Kinesis Firehose Delivery Stream
    this.firehoseDeliveryStream = new CfnDeliveryStream(this, 'FirehoseDeliveryStream', {
      deliveryStreamType: 'DirectPut',
      s3DestinationConfiguration: {
        bucketArn: target.bucketArn,
        roleArn: firehoseRole.roleArn,
        prefix: propsWithDefaults.prefix,
        errorOutputPrefix: propsWithDefaults.errorOutputPrefix,
        bufferingHints: propsWithDefaults.bufferingHints,
        compressionFormat: propsWithDefaults.compressionFormat,
      },
      kinesisStreamSourceConfiguration: {
        kinesisStreamArn: source.streamArn,
        roleArn: firehoseRole.roleArn, // Use the ARN of the created role
      },
    });
  }
}
