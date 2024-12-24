import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // Используем Switch вместо Routes
import { HelmetMeta } from "./HelmetMeta";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";

import { Home } from "../pages/Home";
import Callback from "../pages/Callback";
import Success from "../pages/Success";
import Error from "../pages/Error";

const Resume = lazy(() => import("../pages/Resume"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

export const App = () => {
    logCredits();

    return (
        <ThemeProvider>
            <CssBaseline />
            <Router>
                <HelmetMeta />
                <Switch> {/* Заменили Routes на Switch */}
                    <Route exact path="/" component={Home} /> {/* Для path="/" добавляем exact */}
                    <Route path="/resume" component={Resume} />
                    <Route path="/callback" component={Callback} />
                    <Route path="/success" component={Success} />
                    <Route path="/error" component={Error} />
                    <Route path="*" component={PageNotFound} /> {/* Для маршрута, который не найден */}
                </Switch>
            </Router>
        </ThemeProvider>
    );
};