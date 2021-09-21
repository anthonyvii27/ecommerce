import { ICreateCustomer, IAuthenticateCustomer } from "@interfaces/ICustomer";
import { PrismaClient } from "@prisma/client";

export class CustomerRepository {
    private readonly prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async registerNewCustomer(customer: ICreateCustomer) {
        const entity = await this.prismaClient.customer.create({
            data: {
                cpf: customer.cpf,
                customer_name: customer.name,
                customer_password: customer.password,
                birthdate: new Date(customer.birthdate),
                gender: customer.gender,
                phone_number: customer.phoneNumber,
                customer_email: customer.email,
                wpp_notifications: customer.wppNotifications,
                email_notification: customer.emailNotifications,
                created_at: new Date(),
            },
        });

        return entity;
    }

    async getCustomer(authData: IAuthenticateCustomer) {
        return this.prismaClient.customer.findFirst({
            where: {
                customer_email: authData.email,
                customer_password: authData.password,
            },
        });
    }
}
