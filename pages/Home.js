import React from "react";

import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
    Image,
    TouchableHighlight,
    Linking
} from "react-native";

import { connect } from "react-redux";

const mapStateToProps = state => ({
  drinks: state.drinks,
  loading: state.loading
});

const styles = StyleSheet.create({
  input: { borderColor: "grey", borderWidth: 1, padding: 5, width:'75%' },
  container: {
    flex: 1,
    marginTop: 5
  },
  baseText: {
      alignItems: 'center'
  },
  form: {
    margin: 5,
    display: 'flex',
    flexDirection: "row"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  searchCocktails() {
    this.props.dispatch({
      type: "LOAD",
      value: true
    });
    const url = encodeURI(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
      this.state.search
    }`);
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.props.dispatch({
          type: "SET_COCKTAILS",
          value: res.drinks
        });
        this.props.dispatch({
          type: "LOAD",
          value: false
        });
      });
  }

  loadAlcoholic(){
    this.props.dispatch({
      type: "LOAD",
      value: true
    });
    const url = encodeURI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`);
    fetch(url)
        .then(res => res.json())
        .then(res => {
          this.props.dispatch({
            type: "SET_COCKTAILS",
            value: res.drinks
          });
          this.props.dispatch({
            type: "LOAD",
            value: false
          });
        });
  }

  loadNonAlcoholic(){
    this.props.dispatch({
      type: "LOAD",
      value: true
    });
    const url = encodeURI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`);
    fetch(url)
        .then(res => res.json())
        .then(res => {
          this.props.dispatch({
            type: "SET_COCKTAILS",
            value: res.drinks
          });
          this.props.dispatch({
            type: "LOAD",
            value: false
          });
        });
  }

  randomCocktail(){
    const url = encodeURI('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      fetch(url)
          .then(res => res.json())
          .then(res => {
              this.props.dispatch({
                  type: "SET_COCKTAILS",
                  value: res.drinks
              });
              this.props.dispatch({
                  type: "LOAD",
                  value: false
              });
          });
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight
              onPress={() => Linking.openURL('https://www.thecocktaildb.com')}>
              <Image
                  source={{uri: 'https://www.thecocktaildb.com/images/logo.png'}}
                  style={{width: 350, height: 50}} />
          </TouchableHighlight>
        <Button onPress={() => this.randomCocktail()} title="Random cocktail" />
        <Button onPress={() => this.loadAlcoholic()} title="Alcoholic cocktails" />
        <Button onPress={() => this.loadNonAlcoholic()} title="NonAlcoholic cocktails" />
        <Text style={styles.baseText}> Recherchez un cocktail : </Text>
        <View style={styles.form}>
          <TextInput
            onChangeText={searchState => this.setState({ search: searchState })}
            style={styles.input}
            value={this.state.search}
          />
          <Button onPress={() => this.searchCocktails()} title="Search" />
        </View>


        {this.props.loading ? this.renderLoading() : this.renderList()}
      </View>
    );
  }

  renderList() {
    if(this.props.drinks == "" || this.props.drinks == null ) {
      return (
        <Text style={styles.resultsContainer}>Aucun cocktail correspondant à votre recherche</Text>
      );
  } else {
    return (
      <FlatList
        style={styles.resultsContainer}
        data={this.props.drinks}
        keyExtractor={item => item.idDrink}
        renderItem={this.renderItem}
      />
    );
  }
  }

  renderItem = ({ item }) => {
    return (
      <Button
        title={item.strDrink}
        drink={item}
        onPress={() => {
          this.props.dispatch({
            type: "SELECT_COCKTAIL",
            value: item
          });

          this.props.navigation.navigate("CocktailDetails");
        }}
      />
    );
  };

  renderLoading() {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color="red" size="large" animating />
      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);
