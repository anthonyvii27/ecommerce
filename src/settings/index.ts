import * as dotenv from "dotenv";

dotenv.config();

export abstract class ApplicationEnvironment {
    public static Port: string = process.env.PORT || "";
}

export abstract class ApplicationJWTSecret {
    public static Secret: string = process.env.SECRET || "";
}
