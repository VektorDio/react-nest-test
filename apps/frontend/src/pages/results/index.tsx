import { useState, useEffect, useCallback } from 'react'
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RootState, AppDispatch } from '../../store/store'
import { setSurveys, setAnswers } from '../../store/surveys/surveys.slice'
import { ISurvey, ISurveyList, IAnswer } from '../../types/types'
import { SurveyService } from '../../service/survey.service'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ResultsPage(): JSX.Element {
    const dispatch = useAppDispatch<AppDispatch>()
    const { surveys, answers } = useAppSelector((state: RootState) => state.surveys)
    const [selectedSurvey, setSelectedSurvey] = useState<ISurvey | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchSurveys = async () => {
            setLoading(true)
            try {
                const surveyList = await SurveyService.getSurveyIdsAndNames()
                dispatch(setSurveys(surveyList))
            } catch (error) {
                toast.error('Failed to fetch surveys. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        if (surveys.length === 0) {
            fetchSurveys()
        }
    }, [dispatch, surveys.length])

    const handleSurveySelect = useCallback(async (survey: ISurveyList) => {
        setLoading(true)
        try {
            const fullSurvey = await SurveyService.getSurveyById(survey._id)
            setSelectedSurvey(fullSurvey)
            const surveyResults = await SurveyService.getSurveyAnswersById(survey._id)
            dispatch(setAnswers(surveyResults))
        } catch (error) {
            toast.error('Failed to fetch survey results. Please try again.')
            setSelectedSurvey(null)
        } finally {
            setLoading(false)
        }
    }, [dispatch])

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 64px)">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Survey Results
            </Typography>
            {!selectedSurvey ? (
                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mt={3}>
                    {surveys.map((survey) => (
                        <Button
                            key={survey._id}
                            variant="contained"
                            color="primary"
                            onClick={() => handleSurveySelect(survey)}
                            sx={{ minWidth: 200, py: 1.5 }}
                        >
                            {survey.name}
                        </Button>
                    ))}
                </Box>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom textAlign="center" mt={3}>
                        {selectedSurvey.name} Results
                    </Typography>
                    <TableContainer component={Paper} sx={{ mt: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    {selectedSurvey.questions.map((question, index) => (
                                        <TableCell key={question._id}>Question {index + 1}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {answers.map((answer: IAnswer) => (
                                    <TableRow key={answer._id}>
                                        <TableCell>{answer.user.email}</TableCell>
                                        {selectedSurvey.questions.map((question) => (
                                            <TableCell key={question._id}>
                                                {answer.responses.find((r) => r.question._id === question._id)?.answer || 'N/A'}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setSelectedSurvey(null)}
                            sx={{ mt: 2, py: 1.5, px: 4 }}
                        >
                            Back to Survey Selection
                        </Button>
                    </Box>
                </>
            )}
            <ToastContainer position="bottom-right" autoClose={5000} />
        </Container>
    )
}
