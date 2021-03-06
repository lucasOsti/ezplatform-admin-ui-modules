import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChooseLanguageComponent extends Component {
    constructor(props) {
        super(props);

        this.updateSelection = this.updateSelection.bind(this);
        this.renderOption = this.renderOption.bind(this);

        let selectedLanguageCode = props.allowedLanguages.length ? props.allowedLanguages[0] : props.languages.priority[0];

        if (props.preselectedLanguage) {
            selectedLanguageCode = props.preselectedLanguage;
        }

        if (props.allowedLanguages.length === 1) {
            selectedLanguageCode = props.allowedLanguages[0];
        }

        this.state = {
            selectedLanguage: props.languages.mappings[selectedLanguageCode],
        };
    }

    componentDidMount() {
        this.props.onLanguageSelected(this.state.selectedLanguage);
    }

    updateSelection(event) {
        const languageCode = event.target.value;
        const selectedLanguage = this.props.languages.mappings[languageCode];

        this.props.onLanguageSelected(selectedLanguage);

        this.setState((state) => Object.assign({}, state, { selectedLanguage }));
    }

    renderOption(languageCode, index) {
        const language = this.props.languages.mappings[languageCode];
        const attrs = {
            key: index,
            value: language.languageCode,
        };

        if (this.state.selectedLanguage.languageCode === languageCode) {
            attrs.selected = true;
        }

        return <option {...attrs}>{language.name}</option>;
    }

    renderOptions() {
        const { allowedLanguages, languages } = this.props;
        const languagesList = allowedLanguages.length ? allowedLanguages : languages.priority;

        return languagesList.map(this.renderOption);
    }

    render() {
        const selectAttrs = {
            className: 'form-control',
            onChange: this.updateSelection,
        };
        const selectLanguageTitle = Translator.trans(
            /*@Desc("Select a language")*/ 'content_on_the_fly.select_language.title',
            {},
            'universal_discovery_widget'
        );

        if (this.props.allowedLanguages.length === 1) {
            selectAttrs.disabled = true;
        }

        return (
            <div className="c-choose-language">
                <p className="c-choose-language__title">{selectLanguageTitle}</p>
                <div className="c-choose-lagauge__select-wrapper">
                    <select {...selectAttrs}>{this.renderOptions()}</select>
                </div>
            </div>
        );
    }
}

ChooseLanguageComponent.propTypes = {
    maxHeight: PropTypes.number.isRequired,
    languages: PropTypes.object.isRequired,
    onLanguageSelected: PropTypes.func.isRequired,
    allowedLanguages: PropTypes.array.isRequired,
    preselectedLanguage: PropTypes.string,
};
