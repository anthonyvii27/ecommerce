import HttpException from "@middlewares/errorHandlerMiddleware";
import { PrismaClient } from "@prisma/client";
import { CustomerRepository } from "@repository/customerRepository";
import { NextFunction, Request, Response } from "express";

export class CustomerController {
    private readonly prismaClient: PrismaClient;
    private readonly customerRepository: CustomerRepository;

    constructor(
        prismaClient: PrismaClient,
        customerRepository: CustomerRepository
    ) {
        this.prismaClient = prismaClient;
        this.customerRepository = customerRepository;
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
                await this.prismaClient.customer.findFirst({
                    where: { cpf },
                });

            if (customerAlreadyExists) {
                throw new HttpException(409, "User already exists");
            }

            const customer = await this.customerRepository.registerNewCustomer({
                cpf,
                name,
                password,
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
