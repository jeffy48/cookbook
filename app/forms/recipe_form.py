from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, NumberRange, AnyOf, Length

class RecipeForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired(message="user_id is required and must be an integer")])
    name = StringField('name', validators=[DataRequired(message="name is required and must be a string"), Length(min=2, max=75, message="length of name is invalid")])
    servings = IntegerField('servings', validators=[DataRequired(message="servings is required and must be an integer"), NumberRange(min=1, message="servings must be greater than 0")])
    preptime = IntegerField('preptime', validators=[DataRequired(message="preptime is required and must be an integer"), NumberRange(min=1, message="preptime must be greater 0 minutes")])
    cooktime = IntegerField('cooktime', validators=[DataRequired(message="cooktime is required and must be an integer"), NumberRange(min=1, message="cooktime must be greater 0 minutes")])
    difficulty = StringField('difficulty', validators=[DataRequired(message="difficulty is required and must be a string of 'Easy', 'Medium', or 'Hard'"), AnyOf(['Easy', 'Medium', 'Hard' ])])
    public = BooleanField('public', validators=[AnyOf([True, False])])
    image = StringField('image', validators=[DataRequired(message="image is required and must be a url string"), Length(max=255, message="length of image url is invalid")])
