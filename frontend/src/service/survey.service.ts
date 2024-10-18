import {instance} from "../api/axious.api.ts";
import {IAnswer, IAnswersData, ISurvey} from "../types/types.ts";
import {getTokenFromLocalStorage} from "../helpers/localstorage.ts";

export const SurveyService = {
    async getSurveyIdsAndNames(): Promise<{_id: string, name: string}[]> {
        return (await instance.get('survey/ids', {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage() || ''}` },
        })).data
    },
    async getSurveyById(id: string): Promise<ISurvey> {
        return (await instance.get(`survey/${id}`, {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage() || ''}` },
        })).data
    },
    async getSurveyAnswersById(id: string): Promise<IAnswer[]> {
        return (await instance.get(`survey/${id}/answers`, {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage() || ''}` },
        })).data
    },
    async submitAnswers(answers: IAnswersData) {
        return await instance.post('answer', answers, {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage() || ''}` },
        })
    }
}