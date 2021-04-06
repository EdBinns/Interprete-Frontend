export interface SimpleType {
    name: string;
    text: string;
}

export interface Type {
    simpleType: SimpleType[];
}

export interface Factor {
    name: string;
    text: string;
}

export interface Term {
    factor: Factor[];
}

export interface SimpleExpression {
    term: Term[];
}

export interface Expression {
    simpleExpression: SimpleExpression[];
}

export interface VariableDecl {
    type: Type[];
    name: string;
    text: string;
    expression: Expression[];
}

export interface Statement {
    variableDecl: VariableDecl[];
    name: string;
    text: string;
}

export interface Program {
    statement: Statement[];
    text: string;
}

export interface Snippet {
    program: Program[];
}