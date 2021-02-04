import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "../../styles/layout.styles"
import Typography from "@material-ui/core/Typography";
import { myGithub } from "../shared/links"
import { useDispatchTheme } from "../../context/theme.context";
import { useHistory } from "../../context/words.context";
import { groupBySense } from "../../helpers/counters.helper"
import clsx from "clsx";
import Brands from "./../info/brands"

const Footer = ({ children }) => {
    const classes = useStyles()
    const viewDispatch = useDispatchTheme()
    const value = viewDispatch.value
    const home = value === 'search'
    const info = value === 'info'
    const history = value === 'saves'
    const wordsState = useHistory()
    const selections = groupBySense(wordsState)

    return (
        <footer className={classes.footer}>
            {
                info &&
                    <Typography variant={"caption"}>
                        <Brands/>
                    </Typography>
            }
            {
                history &&
                <Typography
                    variant={"caption"}
                    className={classes.fill}
                >
                    <span>
                        You've saved {wordsState.length} words across {selections.length} distinct definitions.
                        Click <em className={classes.inline}>{'\u2297'}</em> to delete a word or
                        <b className={classes.wrap}>Clear</b> to clear the cache.
                    </span>
                </Typography>
            }
            <Typography variant={"caption"}>
                <span>
                      {children}
                </span>
                <span>
                     Made by Joem Elias Sanez
                    {myGithub}
                </span>
            </Typography>
        </footer>
    );
}

Footer.propTypes = {
    children: PropTypes.any,
};

export default Footer