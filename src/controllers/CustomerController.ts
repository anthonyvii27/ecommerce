import HttpException from "@middlewares/errorHandlerMiddleware";
import { CustomerRepository } from "@repository/customerRepository";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

export class CustomerController {
    private readonly customerRepository: CustomerRepository;

    constructor(customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }

    hashPassword(password: string) {
        return bcrypt.hashSync(password, 8);
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                cpf,
                name,
                email,
                password,
                birthdate,
                gender,
                phoneNumber,
                wppNotifications,
                emailNotifications,
            } = req.body;

            if (
                !cpf ||
                !name ||
                !email ||
                !password ||
                !birthdate ||
                !gender ||
                !phoneNumber ||
                !wppNotifications ||
                !emailNotifications
            ) {
                throw new HttpException(400, "Missing required params");
            }

            const customerAlreadyExists =
                await this.customerRepository.getCustomerByCPF(cpf);

            if (customerAlreadyExists) {
                throw new HttpException(409, "User already exists");
            }

            const encryptedPassword = this.hashPassword(password);

            const customer = await this.customerRepository.registerNewCustomer({
                cpf,
                name,
                password: encryptedPassword,
                birthdate,
                gender,
                phoneNumber,
                email,
                wppNotifications,
                emailNotifications,
            });

            res.status(201).json(customer);
        } catch (err) {
            next(err);
        }
    }
}
