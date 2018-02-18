

declare module '@ronomon/crypto-async' {

    interface Hasher {
        update(source : Buffer, offset? : number, size? : number) : Promise<void>
        update(source : Buffer, offset? : number, size? : number, cb : () => void)
        
        digest(target : Buffer, offset? : number) : number
        digest() : Buffer
    }

    interface CryptoAsync {
        cipher(algorithm : string, encrypt : number, 
            key : Buffer, iv : Buffer, 
            source : Buffer) : Promise<Buffer>
        cipher(algorithm : string, encrypt : number, 
            key : Buffer, iv : Buffer, 
            source : Buffer, 
            cb : (err : any, target : Buffer) => void) : void

        cipher(algorithm : string, encrypt : number, 
            key : Buffer, keyOffset : number, keySize : number, 
            iv : Buffer, ivOffset : number, ivSize : number, 
            source : Buffer, sourceOffset : number, sourceSize : number, 
            target : Buffer, targetOffset : number) : Promise<number>
        cipher(algorithm : string, encrypt : number, 
            key : Buffer, keyOffset : number, keySize : number, 
            iv : Buffer, ivOffset : number, ivSize : number, 
            source : Buffer, sourceOffset : number, sourceSize : number, 
            target : Buffer, targetOffset : number, 
            cb : (err : any, targetSize : number) => void) : void

        hash(algorithm : string, 
            source : Buffer) : Promise<Buffer>
        hash(algorithm : string, 
            source : Buffer,
            cb : (err : any, target : Buffer) => void) : void

        hash(algorithm : string, 
            source : Buffer, sourceOffset : number, sourceSize : number,
            target : Buffer, targetOffset : number) : Promise<number>
        hash(algorithm : string, 
            source : Buffer, sourceOffset : number, sourceSize : number,
            target : Buffer, targetOffset : number,
            cb : (err : any, targetSize : number) => void) : void

        hmac(algorithm : string, 
            key : Buffer, source : Buffer) : Promise<Buffer>
        hmac(algorithm : string, 
            key : Buffer, source : Buffer,
            cb : (err : any, target : Buffer) => void) : void

        hmac(algorithm : string, 
            key : Buffer, keyOffset : number, keySize : number, 
            source : Buffer, sourceOffset : number, sourceSize : number,
            target : Buffer, targetOffset : number) : Promise<number>
        hmac(algorithm : string, 
            key : Buffer, keyOffset : number, keySize : number, 
            source : Buffer, sourceOffset : number, sourceSize : number,
            target : Buffer, targetOffset : number,
            cb : (err : any, targetSize : number) => void) : void

        createHash(algorithm : string) : Hasher;
    }

    export = new CryptoAsync
}
