from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import  db, CollectionRecipe, Recipe
from app.forms import CollectionRecipeForm
from app.api.collection_routes import collection_routes

collection_recipe_routes = Blueprint('collection-recipes', __name__)

@collection_routes.route('/<int:collection_id>/recipes')
@login_required
def get_collection_recipes(collection_id):
    """
    Get all recipes by collection id
    """
    recipes = db.session.query(CollectionRecipe, Recipe).join(Recipe, CollectionRecipe.recipe_id == Recipe.id).filter(CollectionRecipe.collection_id == collection_id).all()
    res = [recipe[1] for recipe in recipes]

    return jsonify([recipe.to_dict() for recipe in res])

@collection_recipe_routes.route('/')
@login_required
def create_collection_recipe():
    """
    A logged in user can add a recipe to a collection
    """
    form = CollectionRecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        collection_recipe = CollectionRecipe(
            collection_id = form.data['collection_id'],
            recipe_id = form.data['recipe_id']
        )
        db.session.add(collection_recipe)
        db.session.commit()

        return collection_recipe.to_dict()
    return {'errors': form.errors}, 400

@collection_recipe_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_collection_recipe(id):
    """
    A logged in user can remove a recipe from a collection they own
    """
    collection_recipe = CollectionRecipe.query.get(id)
    if collection_recipe:
        db.session.delete(collection_recipe)
        db.session.commit()
        return collection_recipe.to_dict()
    return {'errors': "Deletion failed: Recipe not found in collection"}, 404
