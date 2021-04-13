export interface AnchorPeer{
    Host:string;
    Port:number;
}

export interface Organization{
    Name:string;
    AnchorPeer:AnchorPeer;
}

export interface BatchSize{
    MaxMessageCount:number;
    AbsoluteMaxBytes:number;
    PreferredMaxBytes:number;
}

export interface Orderer{
    Host:string;
    Port:number;
}

export interface Consensus{
    OrdererType:string;
    BatchTimeout:number;
    BatchSize:BatchSize;
    Orderers:Orderer[];
}

export interface Channel{
    Name:string;
    Consortium:string;
    Organizatioins:Organization[];
}

export interface Configtx{
    Organizations:Organization[];
    Consensus:Consensus;
    Channel:Channel;
}