# Reduxish

Two of my biggest challenges with Redux are:

1. [creating multiple copies of the same component without having namespace collisions](https://github.com/reactjs/redux/issues/897)

2. the decoupling of where a components state lived in the global state and having to `connect` that component to the global state.

Well, long story short, here's a potential solution that solves both of these issues. It's basically the [Elm 0.16 Architecture](https://github.com/evancz/elm-architecture-tutorial/tree/e1e77f902056160159ec2a75474c5e1329fb8bd1) without being so rigorously functional.

Basically, you define static methods on your component classes for `init`and `reducer`. Each component also gets `dispatch` and `state` as props. Then you can wrap and unwrap actions while composing the initial state and reducers in order to namespace each component.

There are 4 examples which are grouped in `src/index.js`. Uncomment only one block to run that example. To get it running, just run `npm install && npm start`.

This example is also specific using `redux-thunk` middleware -- check out how `wrapAction` works in `src/utils.js`.

The biggest trade-off to this approach over vanilla Redux is that every component now has strict encapsulation. That is, actions are no longer global. So if you import a component and dispatch one of it's actions, it's likely that nothing will happen because that component's state / action namespace might not be top-level. But that all makes sense because the problem we were trying to solve in the first place is that we couldn't render multiple independent copies of a single component!