import { useEffect, useState, useMemo, useCallback } from 'react'
import {
    Button, Typography, Radio, RadioGroup, FormControlLabel,
    FormControl, FormLabel, Paper, Box, CircularProgress
} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RootState, AppDispatch } from '../../store/store'
import { setSurveys, setAnswers } from '../../store/surveys/surveys.slice'
import { IAnswersData, ISurvey, ISurveyList } from '../../types/types'
import { SurveyService } from '../../service/survey.service'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

interface SurveyListProps {
    surveys: ISurveyList[]
    onSelect: (surveyId: string) => void
    completedSurveys: string[]
}

function SurveyList({ surveys, onSelect, completedSurveys }: SurveyListProps): JSX.Element {
    return (
        <Paper elevation={3} sx={{ p: 4, width: '100%', mx: 'auto' }}>
            <Typography variant="h4" gutterBottom align="center">Choose a Survey</Typography>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2} width="100%">
                {surveys.map((survey) => (
                    <Button
                        key={survey._id}
                        variant="contained"
                        color="primary"
                        onClick={() => onSelect(survey._id)}
                        disabled={completedSurveys.includes(survey._id)}
                        fullWidth
                    >
                        {survey.name}
                    </Button>
                ))}
            </Box>
        </Paper>
    )
}

interface SurveyFormProps {
    survey: ISurvey
    onSubmit: (answers: Record<string, string>) => void
    onBack: () => void
}

function SurveyForm({ survey, onSubmit, onBack }: SurveyFormProps): JSX.Element {
    const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({})

    const handleAnswerChange = useCallback((questionId: string, answer: string) => {
        setCurrentAnswers(prev => ({ ...prev, [questionId]: answer }))
    }, [])

    const isSubmitDisabled = useMemo(() => {
        return !survey.questions.every((q) => currentAnswers[q._id])
    }, [survey.questions, currentAnswers])

    return (
        <Paper elevation={3} sx={{ p: 4, width: '100%', mx: 'auto' }}>
            <Typography variant="h4" gutterBottom align="center">{survey.name}</Typography>
            <form onSubmit={(e) => {
                e.preventDefault()
                onSubmit(currentAnswers)
            }}>
                {survey.questions.map((question) => (
                    <FormControl key={question._id} component="fieldset" margin="normal" fullWidth>
                        <FormLabel component="legend">{question.text}</FormLabel>
                        <RadioGroup
                            value={currentAnswers[question._id] || ''}
                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                        >
                            {question.options.map((option) => (
                                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                ))}
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button variant="outlined" color="secondary" onClick={onBack}>
                        Back to Survey Selection
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitDisabled}
                    >
                        Submit Survey
                    </Button>
                </Box>
            </form>
        </Paper>
    )
}

export default function SurveyPage(): JSX.Element {
    const dispatch = useAppDispatch<AppDispatch>()
    const { surveys } = useAppSelector((state: RootState) => state.surveys)
    const user = useAppSelector((state: RootState) => state.user.user)
    const [surveyList, setSurveyList] = useState<ISurveyList[]>([])
    const [selectedSurvey, setSelectedSurvey] = useState<ISurvey | null>(null)
    const [loading, setLoading] = useState(false)
    const [completedSurveys, setCompletedSurveys] = useState<string[]>(user?.completedSurveys || [])

    useEffect(() => {
        const fetchSurveyList = async () => {
            setLoading(true)
            try {
                const response = await SurveyService.getSurveyIdsAndNames()
                setSurveyList(response)
            } catch (err) {
                toast.error('Failed to fetch surveys. Please try again later.')
            } finally {
                setLoading(false)
            }
        }
        fetchSurveyList()
    }, [])

    const handleSurveySelect = useCallback(async (surveyId: string) => {
        setLoading(true)
        try {
            const existingSurvey = surveys.find(s => s._id === surveyId)
            if (existingSurvey) {
                setSelectedSurvey(existingSurvey)
            } else {
                const response = await SurveyService.getSurveyById(surveyId)
                setSelectedSurvey(response)
                dispatch(setSurveys([...surveys, response]))
            }
        } catch (err) {
            toast.error('Failed to load survey. Please try again.')
        } finally {
            setLoading(false)
        }
    }, [surveys, dispatch])

    const handleSubmit = useCallback(async (currentAnswers: Record<string, string>) => {
        if (selectedSurvey && user) {
            const answerData: IAnswersData = {
                survey: selectedSurvey._id,
                user: user._id,
                responses: Object.entries(currentAnswers).map(([questionId, answer]) => ({ question: questionId, answer })),
            }
            setLoading(true)
            try {
                await SurveyService.submitAnswers(answerData)
                dispatch(setAnswers(answerData))
                toast.success('Thank you for completing the survey!')
                setCompletedSurveys(prev => [...prev, selectedSurvey._id])
                setSelectedSurvey(null)
            } catch (err) {
                toast.error('Failed to submit survey answers. Please try again.')
            } finally {
                setLoading(false)
            }
        }
    }, [selectedSurvey, user, dispatch])

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 64px)">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)', width: '100%' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4, px: 2 }}>
                {!selectedSurvey ? (
                    <SurveyList
                        surveys={surveyList}
                        onSelect={handleSurveySelect}
                        completedSurveys={completedSurveys}
                    />
                ) : (
                    <SurveyForm
                        survey={selectedSurvey}
                        onSubmit={handleSubmit}
                        onBack={() => setSelectedSurvey(null)}
                    />
                )}
            </Box>
            <ToastContainer position="bottom-right" autoClose={5000} />
        </Box>
    )
}
