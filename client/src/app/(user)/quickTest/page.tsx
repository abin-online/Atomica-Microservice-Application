'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
  LinearProgress
} from '@mui/material';
import {
  School as SchoolIcon,
  PlayArrow as PlayArrowIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { getAllTags } from '@/api/tag';
import toast from 'react-hot-toast';

interface Tag {
  _id: string;
  name: string;
  blocked: boolean;
  __v: number;
}

const QuickTestHome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response : any = await getAllTags();
        setTags(response.data);
      } catch (error) {
        toast.error("Failed to load tags");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStartQuiz = () => {
    if (!selectedTag || !difficulty) {
      toast.error("Please select a tag and difficulty level");
      return;
    }

    const queryString = new URLSearchParams({
      tag: selectedTag,
      difficulty: difficulty,
    }).toString();

    router.push(`/quiz?${queryString}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
        px: 2
      }}
    >
      <Container maxWidth="md">
        <Grow in={true} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 2,
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <SchoolIcon 
                sx={{ 
                  fontSize: 48, 
                  color: theme.palette.primary.main,
                  mb: 2 
                }} 
              />
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome to Quick Test!
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Challenge yourself with quizzes tailored to your skills
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ width: '100%', mt: 4 }}>
                <LinearProgress />
              </Box>
            ) : (
              <Fade in={!loading} timeout={1000}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 3
                    }}
                  >
                    <SettingsIcon /> Customize Your Quiz
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel>Select Topic</InputLabel>
                    <Select
                      value={selectedTag}
                      onChange={(e: any) => setSelectedTag(e.target.value)}
                      label="Select Topic"
                    >
{Array.isArray(tags) && tags.map((tag) => (
  !tag.blocked && (
    <MenuItem key={tag._id} value={tag._id}>
      {tag.name}
    </MenuItem>
  )
))}

                    </Select>
                  </FormControl>

                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Difficulty Level
                  </Typography>
                  <RadioGroup
                    row={!isMobile}
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    sx={{
                      mb: 4,
                      justifyContent: 'space-around',
                      '& .MuiFormControlLabel-root': {
                        flex: 1,
                        mx: 1,
                      }
                    }}
                  >
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <FormControlLabel
                        key={level}
                        value={level}
                        control={<Radio />}
                        label={level}
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          p: 1,
                          m: 1,
                          flex: 1,
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                          ...(difficulty === level && {
                            bgcolor: 'primary.light',
                            color: 'primary.main',
                          }),
                        }}
                      />
                    ))}
                  </RadioGroup>

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleStartQuiz}
                    startIcon={<PlayArrowIcon />}
                    sx={{
                      py: 2,
                      mt: 2,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      '&:hover': {
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      },
                    }}
                  >
                    Start Quiz
                  </Button>
                </Box>
              </Fade>
            )}
          </Paper>
        </Grow>
      </Container>
    </Box>
  );
};

export default QuickTestHome;

      // {/* Popular Quizzes Section */}
      // <section className="popular-quizzes py-8 px-6 mt-8 bg-gray-50 shadow-md rounded-lg max-w-4xl mx-auto">
      //   <h2 className="text-2xl font-semibold mb-4">Popular Quizzes</h2>
      //   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      //     <li className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all">
      //       <h3 className="text-xl font-bold mb-2">JavaScript Basics</h3>
      //       <p className="text-gray-600">Learn the fundamentals of JavaScript.</p>
      //       <button className="mt-4 btn-primary px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all">
      //         Start Quiz
      //       </button>
      //     </li>
      //     <li className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all">
      //       <h3 className="text-xl font-bold mb-2">SQL Mastery</h3>
      //       <p className="text-gray-600">Test your SQL skills with intermediate-level questions.</p>
      //       <button className="mt-4 btn-primary px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all">
      //         Start Quiz
      //       </button>
      //     </li>
      //     <li className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all">
      //       <h3 className="text-xl font-bold mb-2">Data Structures</h3>
      //       <p className="text-gray-600">Advanced questions on arrays, trees, and more.</p>
      //       <button className="mt-4 btn-primary px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all">
      //         Start Quiz
      //       </button>
      //     </li>
      //   </ul>
      // </section>

      // {/* Stats Section */}
      // <section className="stats py-8 px-6 mt-8 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      //   <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
      //   <div className="stats-cards grid grid-cols-1 sm:grid-cols-3 gap-6">
      //     <div className="stat-card bg-gray-50 p-4 rounded-lg shadow text-center">
      //       <h3 className="text-xl font-bold">Questions Attempted</h3>
      //       <p className="text-3xl font-semibold mt-2">120</p>
      //     </div>
      //     <div className="stat-card bg-gray-50 p-4 rounded-lg shadow text-center">
      //       <h3 className="text-xl font-bold">Accuracy</h3>
      //       <p className="text-3xl font-semibold mt-2">85%</p>
      //     </div>
      //     <div className="stat-card bg-gray-50 p-4 rounded-lg shadow text-center">
      //       <h3 className="text-xl font-bold">Current Streak</h3>
      //       <p className="text-3xl font-semibold mt-2">5 Days</p>
      //     </div>
      //   </div>
      // </section>

      // {/* Footer */}
      // <footer className="py-6 mt-8 bg-primary-500 text-white text-center">
      //   <p>&copy; 2024 Quick Test. All rights reserved.</p>
      // </footer>
