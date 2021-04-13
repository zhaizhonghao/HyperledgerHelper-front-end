export interface OrdererCp{
    HostName:string;
}

export interface PeerOrgCp{
    Name:string;
    Domain:string;
    CountOfPeers:number;
    CountOfUsers:number;
}

export interface ConfigCp{
    OrdererCps:OrdererCp[];
    PeerOrgCps:PeerOrgCp[];
}