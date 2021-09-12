import HttpException from "@middlewares/errorHandlerMiddleware";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export class CustomerController {
    private readonly prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
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

            const customer = await this.prismaClient.customer.create({
                data: {
                    cpf,
                    customer_name: name,
                    customer_password: password,
                    birthdate: new Date(birthdate),
                    gender,
                    phone_number: phoneNumber,
                    customer_email: email,
                    wpp_notifications: wppNotifications,
                    email_notification: emailNotifications,
                    created_at: new Date(),
                },
            });

            res.status(201).json(customer);
        } catch (err) {
            next(err);
        }
    }
}
