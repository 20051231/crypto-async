

declare module '@ronomon/crypto-async' {

    interface Hasher {
        update(source : Buffer, offset? : number, size? : number) : Promise<void>
        update(source : Buffer, cb : () => void) : void
        update(source : Buffer, offset : number, cb : () => void) : void
        update(source : Buffer, offset : number, size : number, cb : () => void) : void
        
        digest(target : Buffer, offset? : number) : number
        digest() : Buffer
    }

    export function cipher(algorithm : string, encrypt : number, 
        key : Buffer, iv : Buffer, 
        source : Buffer) : Promise<Buffer>
    export function cipher(algorithm : string, encrypt : number, 
        key : Buffer, iv : Buffer, 
        source : Buffer, 
        cb : (err : any, target : Buffer) => void) : void

    export function cipher(algorithm : string, encrypt : number, 
        key : Buffer, keyOffset : number, keySize : number, 
        iv : Buffer, ivOffset : number, ivSize : number, 
        source : Buffer, sourceOffset : number, sourceSize : number, 
        target : Buffer, targetOffset : number) : Promise<number>;
    export function cipher(algorithm : string, encrypt : number, 
        key : Buffer, keyOffset : number, keySize : number, 
        iv : Buffer, ivOffset : number, ivSize : number, 
        source : Buffer, sourceOffset : number, sourceSize : number, 
        target : Buffer, targetOffset : number, 
        cb : (err : any, targetSize : number) => void) : void

    export function hash(algorithm : string, 
        source : Buffer) : Promise<Buffer>
    export function hash(algorithm : string, 
        source : Buffer,
        cb : (err : any, target : Buffer) => void) : void

    export function hash(algorithm : string, 
        source : Buffer, sourceOffset : number, sourceSize : number,
        target : Buffer, targetOffset : number) : Promise<number>
    export function hash(algorithm : string, 
        source : Buffer, sourceOffset : number, sourceSize : number,
        target : Buffer, targetOffset : number,
        cb : (err : any, targetSize : number) => void) : void

    export function hmac(algorithm : string, 
        key : Buffer, source : Buffer) : Promise<Buffer>
    export function hmac(algorithm : string, 
        key : Buffer, source : Buffer,
        cb : (err : any, target : Buffer) => void) : void

    export function hmac(algorithm : string, 
        key : Buffer, keyOffset : number, keySize : number, 
        source : Buffer, sourceOffset : number, sourceSize : number,
        target : Buffer, targetOffset : number) : Promise<number>
    export function hmac(algorithm : string, 
        key : Buffer, keyOffset : number, keySize : number, 
        source : Buffer, sourceOffset : number, sourceSize : number,
        target : Buffer, targetOffset : number,
        cb : (err : any, targetSize : number) => void) : void

    export function createHash(algorithm : string) : Hasher;
}
