import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const current = aws.getCallerIdentity({});
export const accountId = current.then(current => current.accountId);
export const callerArn = current.then(current => current.arn);
export const callerUser = current.then(current => current.userId);

const cluster = new aws.ecs.Cluster("cluster", {});
const lb = new awsx.lb.ApplicationLoadBalancer("lb", {});

export const securityGroups = lb.loadBalancer.securityGroups;

const repository = new awsx.ecr.Repository("repository", {});
const image = new awsx.ecr.Image("image", {
    repositoryUrl: repository.url,
    path: "../",
});
export const imageUrl = repository.url;

const _default = new aws.rds.Instance("default", {
    allocatedStorage: 10,
    dbName: "mydb",
    engine: "mysql",
    engineVersion: "5.7",
    instanceClass: "db.t3.micro",
    parameterGroupName: "default.mysql5.7",
    password: "corcaJJang",
    skipFinalSnapshot: true,
    username: "admin",
    vpcSecurityGroupIds: securityGroups,
});

const service = new awsx.ecs.FargateService("service", {
    cluster: cluster.arn,
    assignPublicIp: true,
    desiredCount: 2,
    taskDefinitionArgs: {
        container: {
            image: imageUrl,
            cpu: 512,
            memory: 128,
            essential: true,
            portMappings: [{
                targetGroup: lb.defaultTargetGroup,
            }],
            environment: [{"name": "DATABASE_HOST", "value": _default.address}, {"name": "DATABASE_PORT", "value": "3306"}, {"name": "DATABASE_USER", "value": _default.username}, {"name": "DATABASE_PASS", "value": "corcaJJang"}, {"name": "DATABASE_NAME", "value": _default.dbName}],
        },
    },
});

export const dbUrl = _default.address;
export const url = lb.loadBalancer.dnsName;