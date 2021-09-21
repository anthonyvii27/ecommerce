import HttpException from "@middlewares/errorHandlerMiddleware";
import { CustomerRepository } from "@repository/customerRepository";
import { ApplicationJWTSecret } from "@settings/index";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthController {
    private readonly customerRepository: CustomerRepository;

    constructor(customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }

    async authenticate(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new HttpException(400, "Missing required params");
        }

        const user = await this.customerRepository.getCustomerToAuthenticate({
            email,
            password,
        });

        if (!user) {
            throw new HttpException(401, "User not found");
        }

        const token = jwt.sign({ id: user.cpf }, ApplicationJWTSecret.Secret, {
            expiresIn: "1d",
        });

        delete user.customer_password;

        return res.json({ user, token });
    }
}
