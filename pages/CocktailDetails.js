import React from "react";

import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { connect } from "react-redux";

const mapStateToProps = state => ({
  drink: state.drink,
  loading: state.loading
});

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    marginTop: 15
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text : {
    textAlign: "center"
  }
});

class CocktailDetails extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "LOAD",
      value: true
    });
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${
      this.props.drink.idDrink
    }`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({ drink: res.drinks });
        this.props.dispatch({
          type: "LOAD",
          value: false
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      detail: []
    };

    const ingredientsList = [];
    for (let i = 1; i < 16; i++) {

      let ingredient = 'strIngredient' + i;
      let quantity = 'strMeasure' + i;

      if (this.props.drink[ingredient] !== ""){
        ingredientsList.push({
          ingredient: this.props.drink[ingredient],
          quantity: this.props.drink[quantity]
        });
      }
      console.log(ingredientsList);
    }

    this.state = { ingredientsList };
  }

  render() {
    console.log(this.props.drink)
    return (
      <View style={styles.container}>
        {this.props.loading ? this.renderLoading() : this.renderDetails()}
      </View>
    );
  }
  
  renderDetails() {
    return (
      <View>
        <ScrollView>
          {this.props.drink.strDrink && (
              <View>
                <View>
                  <Text style={styles.title}>{this.props.drink.strDrink}</Text>
                </View>
              </View>
          )}
          {this.props.drink.strCategory && (
              <View>
                <Text style={styles.text}>{this.props.drink.strCategory}</Text>
              </View>
          )}
          {this.props.drink.strDrinkThumb && (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{width: 100, height: 100}}
                    source={{
                      uri:
                          this.props.drink.strDrinkThumb == null || this.props.drink.strDrinkThumb == ""
                              ? "http://globaltassels.org/files/2016/03/gt-product-logo-cocktail.gif"
                              : this.props.drink.strDrinkThumb
                    }}
                />
              </View>
          )}
          {this.props.drink.strInstructions && (
            <View>
              <Text style={styles.title}>Instructions</Text>
              <Text style={styles.text} >{this.props.drink.strInstructions}</Text>
            </View>
          )}
          {this.props.drink.strTags && (
              <View>
                <Text style={styles.title}>Tags</Text>
                <Text style={styles.text}>{this.props.drink.strTags}</Text>
              </View>
          )}

          <View>
          <Text style={styles.title}>Ingredients</Text>
            {this.state.ingredientsList.map((ingredientsList, index) => (
                <Text style={styles.text}>{ingredientsList.ingredient} : {ingredientsList.quantity}</Text>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color="red" size="large" animating />
      </View>
    );
  }
}

export default connect(mapStateToProps)(CocktailDetails);
