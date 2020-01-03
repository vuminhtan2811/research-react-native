import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Platform} from 'react-native';

import Input from '../../utils/forms/input';
import ValidationRules from '../../utils/forms/validationRules';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signUp, signIn} from '../../store/actions/user_action';
import {setTokens, getTokens} from '../../utils/storage';

class AuthFormComponent extends Component {
  state = {
    type: 'Login',
    action: 'Login',
    actionMode: 'I want to register',
    hasErrors: false,
    form: {
      email: {
        value: '',
        valid: false,
        type: 'textInput',
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      password: {
        value: '',
        valid: false,
        type: 'textInput',
        rules: {
          isRequired: true,
          minLength: 6,
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'textInput',
        rules: {
          confirmPass: 'password',
        },
      },
    },
  };

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false,
    });
    let formCopy = this.state.form;
    formCopy[name].value = value;

    ///Rules
    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);
    formCopy[name].valid = valid;
    this.setState({
      form: formCopy,
    });
  };

  formHasErrors = () =>
    this.state.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Oops, check your info.</Text>
      </View>
    ) : null;

  confirmPassword = () =>
    this.state.type !== 'Login' ? (
      <Input
        type={this.state.form.email.type}
        placeholder="Confirm password"
        placeholderTextColor="#000"
        value={this.state.form.confirmPassword.value}
        autoCapitalize={'none'}
        autoCorrect={false}
        secureTextEntry
        onChangeText={value => this.updateInput('confirmPassword', value)}
      />
    ) : null;

  submitUser = () => {
    let isFormValid = true;
    let isFormSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      //LOGIN
      if (this.state.type === 'Login') {
        if (key !== 'confirmPassword') {
          isFormValid = isFormValid && formCopy[key].valid;
          isFormSubmit[key] = formCopy[key].value;
        }
      } else {
        // REGISTER
        isFormValid = isFormValid && formCopy[key].valid;
        isFormSubmit[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      if (this.state.type === 'Login') {
        this.props.signIn(isFormSubmit).then(() => {
          this.manageAccess();
        });
      } else {
        this.props.signUp(isFormSubmit).then(() => {
          this.manageAccess();
        });
      }
    } else {
      this.setState({
        hasErrors: true,
      });
    }
  };

  changeFormType = () => {
    const {type} = this.state;
    this.setState({
      type: type === 'Login' ? 'Register' : 'Login',
      action: type === 'Login' ? 'Register' : 'Login',
      actionMode: type === 'Login' ? 'I want to login' : 'I want to register',
    });
  };

  manageAccess = () => {
    if (!this.props.User.auth.uid) {
      this.setState({
        hasErrors: true,
      });
    } else {
      setTokens(this.props.User.auth, () => {
        this.setState({
          hasErrors: false,
        });
        this.props.goNext();
      });
    }
  };

  render() {
    const {form} = this.state;
    return (
      <View style={styles.form}>
        <View>
          <Input
            type={form.email.type}
            placeholder="Enter email"
            placeholderTextColor="#000"
            value={form.email.value}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            autoCorrect={false}
            onChangeText={value => this.updateInput('email', value)}
          />
          <Input
            type={form.email.type}
            placeholder="Enter password"
            placeholderTextColor="#000"
            value={form.password.value}
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry
            onChangeText={value => this.updateInput('password', value)}
          />
          {this.confirmPassword()}
          {this.formHasErrors()}
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title={this.state.action} onPress={this.submitUser} />
          </View>
          <View style={styles.button}>
            <Button
              title={this.state.actionMode}
              onPress={this.changeFormType}
            />
          </View>
          {this.state.type === 'Login' ? (
            <View style={styles.button}>
              <Button title="Login Later" onPress={() => this.props.goNext()} />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f44336',
  },
  errorLabel: {
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    ...Platform.select({
      ios: {
        marginBottom: 0,
      },
      android: {
        marginBottom: 10,
      },
    }),
  },
});

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({signIn, signUp}, dispatch);
}

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AuthFormComponent);
