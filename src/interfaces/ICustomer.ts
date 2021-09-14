enum customerGender {
    "Masculino",
    "Feminino",
    "Neutro",
    "Não informar",
}

export interface ICreateCustomer {
    cpf: string;
    name: string;
    password: string;
    birthdate: Date;
    gender: customerGender;
    phoneNumber: string;
    email: string;
    wppNotifications: boolean;
    emailNotifications: boolean;
}
