from django.test import TestCase
from .models import User, Team, Workout, Activity, Leaderboard

class ModelTestCase(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team', description='A test team')
        self.assertEqual(str(team), 'Test Team')
    def test_user_creation(self):
        team = Team.objects.create(name='Test Team2')
        user = User.objects.create(email='test@example.com', username='testuser', team=team)
        self.assertEqual(str(user), 'testuser')
    def test_workout_creation(self):
        workout = Workout.objects.create(name='Pushups', description='Do pushups', difficulty='Easy')
        self.assertEqual(str(workout), 'Pushups')
    def test_activity_creation(self):
        team = Team.objects.create(name='Test Team3')
        user = User.objects.create(email='test2@example.com', username='testuser2', team=team)
        workout = Workout.objects.create(name='Situps', description='Do situps', difficulty='Medium')
        activity = Activity.objects.create(user=user, workout=workout, duration=30, calories_burned=100)
        self.assertEqual(str(activity), 'testuser2 - Situps')
    def test_leaderboard_creation(self):
        team = Team.objects.create(name='Test Team4')
        user = User.objects.create(email='test3@example.com', username='testuser3', team=team)
        leaderboard = Leaderboard.objects.create(user=user, score=1000, rank=1)
        self.assertEqual(str(leaderboard), 'testuser3 - Rank 1')
