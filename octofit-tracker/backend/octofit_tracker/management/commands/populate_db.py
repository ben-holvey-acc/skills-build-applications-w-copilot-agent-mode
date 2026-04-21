from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Workout, Activity, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        # Create Users
        users = [
            User.objects.create(email='ironman@marvel.com', username='Iron Man', team=marvel, is_superhero=True),
            User.objects.create(email='captain@marvel.com', username='Captain America', team=marvel, is_superhero=True),
            User.objects.create(email='spiderman@marvel.com', username='Spider-Man', team=marvel, is_superhero=True),
            User.objects.create(email='batman@dc.com', username='Batman', team=dc, is_superhero=True),
            User.objects.create(email='superman@dc.com', username='Superman', team=dc, is_superhero=True),
            User.objects.create(email='wonderwoman@dc.com', username='Wonder Woman', team=dc, is_superhero=True),
        ]

        # Create Workouts
        pushups = Workout.objects.create(name='Pushups', description='Do pushups', difficulty='Easy')
        running = Workout.objects.create(name='Running', description='Run fast', difficulty='Medium')
        flying = Workout.objects.create(name='Flying', description='Fly around', difficulty='Hard')

        # Create Activities
        Activity.objects.create(user=users[0], workout=pushups, duration=30, calories_burned=100)
        Activity.objects.create(user=users[1], workout=running, duration=45, calories_burned=300)
        Activity.objects.create(user=users[2], workout=flying, duration=60, calories_burned=500)
        Activity.objects.create(user=users[3], workout=pushups, duration=20, calories_burned=80)
        Activity.objects.create(user=users[4], workout=running, duration=50, calories_burned=350)
        Activity.objects.create(user=users[5], workout=flying, duration=70, calories_burned=600)

        # Create Leaderboard
        Leaderboard.objects.create(user=users[0], score=1000, rank=1)
        Leaderboard.objects.create(user=users[1], score=900, rank=2)
        Leaderboard.objects.create(user=users[2], score=800, rank=3)
        Leaderboard.objects.create(user=users[3], score=950, rank=1)
        Leaderboard.objects.create(user=users[4], score=850, rank=2)
        Leaderboard.objects.create(user=users[5], score=750, rank=3)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data!'))
