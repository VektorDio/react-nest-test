export interface IUserData {
    email: string;
    password: string;
}

export interface IUser {
    _id: string;
    email: string;
    role: string;
    completedSurveys: string[];
}

export interface IResponseUserData {
    token: string;
    user: IUser;
}

export enum Role {
    User = 'user',
    Admin = 'admin',
}

export interface IQuestion {
    _id: string;
    text: string;
    options: string[]
    survey: string;
}

export interface ISurveyList {
    _id: string;
    name: string;
}

export interface ISurvey {
    _id: string;
    name: string;
    questions: IQuestion[]
}

export interface IResponse {
    _id: string;
    answer: string;
    question: {
        _id: string;
        text: string;
    }
}

export interface IAnswer {
    _id: string;
    survey: string;
    user: {
        _id: string;
        email: string;
    }
    responses: IResponse[]
}

export interface IAnswersData {
    survey: string;
    user: string;
    responses: {
        question: string;
        answer: string;
    }[]
}