require('../../../hobbes/extensions');
var astNodes = require('../../../hobbes/compiler/ast_nodes');

describe('Compiler', function () {
  
  describe('AST nodes', function () {
    
    var testNode = null;
    
    // Common
    function mockASTNode(properties) {
      properties = properties || {};
      var mockNode = new astNodes.ASTNode();
      mockNode.compileNode = function () { return properties.__mock || 'MOCK'; }
      for (key in properties) {
        if (key.substr(0,2) !== '__')
          mockNode[key] = properties[key];
      }
      return mockNode;
    }

    function mockOpts(properties) {
      properties = properties || {};
      var mockOpts = {};
      mockOpts.mergeOpts = function () { return mockOpts; }
      mockOpts.descendScope = function () { return mockOpts; }
      mockOpts.names = {
        __addName : function () {}
      };
      for (key in properties) {
        mockOpts[key] = properties[key];
      }
      return mockOpts;
    }
    
    // Used for tests concerning all nodes
    function commonASTNodeTests() {
      // it should implement ASTNodeInterface
      expect(astNodes.ASTNodeInterface.check(testNode)).not.toBeDefined();
      // it should have children of its own
      expect(testNode.hasOwnProperty('children')).toBe(true);
      expect(typeof testNode.isVavaType).toBe('function');
    };
    
    describe('ASTNode', function () {
      
      beforeEach(function () {
        testNode = new astNodes.ASTNode();
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `ASTNode`', function () {
        expect(testNode.getType()).toBe('ASTNode');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <ASTNode>\n');
      });
      
      it('should include its children in string representation', function () {
        testNode.appendChild(new astNodes.ASTNode());
        expect(testNode.toString()).toBe('- <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end ASTNode spec
    
    describe('CompilationUnit', function () {
      
      beforeEach(function () {
        testNode = new astNodes.CompilationUnit();
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `CompilationUnit`', function () {
        expect(testNode.getType()).toBe('CompilationUnit');
      });
      
      it('should turn itself into a string', function () {
        testNode.vavaPackage = 'java.util';
        expect(testNode.toString()).toBe('- <CompilationUnit vavaPackage: java.util>\n');
      });
      
    }); // end CompilationUnit spec
    
    describe('ClassDeclaration', function () {
      
      beforeEach(function () {
        testNode = new astNodes.ClassDeclaration('Test');
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `ClassDeclaration`', function () {
        expect(testNode.getType()).toBe('ClassDeclaration');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <ClassDeclaration vavaClassName: Test>\n');
      });
      
    }); // end ClassDeclaration spec
    
    describe('FieldDeclaration', function () {
      
      beforeEach(function () {
        var mockVariableDeclarators = mockASTNode({
          length: function () { return 1; }, type: 'VariableDeclarators',
          toString: function () { return ''; }
        });
        testNode = new astNodes.FieldDeclaration('int', mockVariableDeclarators);
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `FieldDeclaration`', function () {
        expect(testNode.getType()).toBe('FieldDeclaration');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <FieldDeclaration vavaType: int>\n');
      });
      
      it('should list its children', function () {
        var mockVariableDeclarators = mockASTNode({
          length: function () { return 1; }, type: 'VariableDeclarators',
          toString: function () { return '  - Kiddo\n'; }
        });
        testNode = new astNodes.FieldDeclaration('int', mockVariableDeclarators);
        expect(testNode.toString()).toBe('- <FieldDeclaration vavaType: int>\n  - Kiddo\n');
      });
      
    }); // end FieldDeclaration spec
    
    describe('LocalVariableDeclaration', function () {
      
      beforeEach(function () {
        var mockVariableDeclarators = mockASTNode({
          length: function () { return 1; }, type: 'VariableDeclarators',
          toString: function () { return ''; }
        });
        testNode = new astNodes.LocalVariableDeclaration('int', mockVariableDeclarators);
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `LocalVariableDeclaration`', function () {
        expect(testNode.getType()).toBe('LocalVariableDeclaration');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <LocalVariableDeclaration vavaType: int>\n');
      });
      
      it('should list its children', function () {
        var mockVariableDeclarators = mockASTNode({
          length: function () { return 1; }, type: 'VariableDeclarators',
          toString: function () { return '  - Kiddo\n'; }
        });
        testNode = new astNodes.LocalVariableDeclaration('int', mockVariableDeclarators);
        expect(testNode.toString()).toBe('- <LocalVariableDeclaration vavaType: int>\n  - Kiddo\n');
      });
      
    }); // end LocalVariableDeclaration spec
    
    describe('LocalVariableDeclarationStatement', function () {
      
      beforeEach(function () {
        testNode = new astNodes.LocalVariableDeclarationStatement(
          mockASTNode({type: 'LocalVariableDeclaration', __mock: 'DECLARATION'})
        );
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `LocalVariableDeclarationStatement`', function () {
        expect(testNode.getType()).toBe('LocalVariableDeclarationStatement');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <LocalVariableDeclarationStatement>\n  - <LocalVariableDeclaration>\n');
      });
      
      it('should compile, adding line separator', function () {
        expect(testNode.compile({})).toBe('DECLARATION;');
      });
      
    }); // end LocalVariableDeclaration spec
    
    describe('VariableDeclarators', function () {
      
      beforeEach(function () {
        testNode = new astNodes.VariableDeclarators();
      });

      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `VariableDeclarators`', function () {
        expect(testNode.getType()).toBe('VariableDeclarators');
      });

      it('should tell its length', function () {
        expect(testNode.length()).toBe(0);
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <VariableDeclarators declarators: 0>\n');
      });
      
    }); // end VariableDeclators spec

    describe('VariableDeclarator', function () {
      
      beforeEach(function () {
        var intLiteral = mockASTNode({type: 'IntegerLiteral', value: 5});
        testNode = new astNodes.VariableDeclarator('foo', intLiteral);
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `VariableDeclarator`', function () {
        expect(testNode.getType()).toBe('VariableDeclarator');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <VariableDeclarator vavaIdentifier: foo vavaInitializer: IntegerLiteral>\n');
      });
      
    }); // end VariableDeclarator spec
    
    describe('MethodDeclaration', function () {
      
      beforeEach(function () {
        testNode = new astNodes.MethodDeclaration(
          {vavaType: 'int', vavaIdentifier: 'foo', vavaFormalParameters: [{identifier: 'bar', vavaType: 'byte'}]},
          mockASTNode({type: 'Block'})
        );
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `MethodDeclaration`', function () {
        expect(testNode.getType()).toBe('MethodDeclaration');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <MethodDeclaration vavaType: int vavaIdentifier: foo>\n  - <Block>\n');
      });

      it('should return its signature', function () {
        expect(testNode.signature()).toBe('foo(byte)');
      });
      
    }); // end MethodDeclaration spec
    
    describe('FormalParameter', function () {
      
      beforeEach(function () {
        testNode = new astNodes.FormalParameter('int', 'foo');
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `FormalParameter`', function () {
        expect(testNode.getType()).toBe('FormalParameter');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <FormalParameter vavaType: int vavaIdentifier: foo>\n');
      });

      it('should compile to object', function () {
        expect(testNode.compile(mockOpts())).toBe('{identifier:"foo",vavaType:"int"}');
      });
      
    }); // end FormalParameter spec

    describe('ReturnStatement', function () {
      
      beforeEach(function () {
        testNode = new astNodes.ReturnStatement(mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `ReturnStatement`', function () {
        expect(testNode.getType()).toBe('ReturnStatement');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <ReturnStatement>\n  - <ASTNode>\n');
      });

      it('should compile with child expression', function () {
        expect(testNode.compile(mockOpts())).toBe('return MOCK;');
      });
      
      it('should compile without child expression', function () {
        testNode = new astNodes.ReturnStatement();
        expect(testNode.compile(mockOpts())).toBe('return;');
      });
      
    }); // end ReturnStatement spec
    
    describe('MethodInvocation', function () {
      
      beforeEach(function () {
        testNode = new astNodes.MethodInvocation(
          mockASTNode({type: 'Name',
            isSimple: function () { return true; }, simple: function () { return 'foo'; },
            qualified: function () { return 'foo'; }
          }),
          mockASTNode({getVavaTypes: function () { return ['int', 'boolean']; }}))
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `MethodInvocation`', function () {
        expect(testNode.getType()).toBe('MethodInvocation');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <MethodInvocation name: foo>\n  - <ASTNode>\n');
      });

      it('should compile with complete signature', function () {
        expect(testNode.compile(mockOpts())).toBe('this.__self.send("foo(int,boolean)", MOCK)');
      });
      
    }); // end MethodInvocation spec
    
    describe('Block', function () {
      
      beforeEach(function () {
        testNode = new astNodes.Block();
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `Block`', function () {
        expect(testNode.getType()).toBe('Block');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <Block>\n');
      });
      
    }); // end Block spec
    
    describe('IntegerLiteral', function () {
      
      beforeEach(function () {
        testNode = new astNodes.IntegerLiteral(0);
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `IntegerLiteral`', function () {
        expect(testNode.getType()).toBe('IntegerLiteral');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <IntegerLiteral value: 0 vavaType: int>\n');
      });
      
    }); // end IntegerLiteral spec

    describe('CharLiteral', function () {
      
      beforeEach(function () {
        testNode = new astNodes.CharLiteral("'a'");
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `CharLiteral`', function () {
        expect(testNode.getType()).toBe('CharLiteral');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <CharLiteral character: a vavaType: char>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('this.__env.CharValue.intern("a")');
      });
      
    }); // end CharLiteral spec

    describe('FloatingPointLiteral', function () {

      beforeEach(function () {
        testNode = new astNodes.FloatingPointLiteral('0f');
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `FloatingPointLiteral`', function () {
        expect(testNode.getType()).toBe('FloatingPointLiteral');
      });

      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <FloatingPointLiteral prePoint: 0 postPoint: 0 exponent: 0 vavaType: float>\n');
      });
      
    }); // end FloatingPointLiteral spec

    describe('NullLiteral', function () {

      beforeEach(function () {
        testNode = new astNodes.NullLiteral();
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `NullLiteral`', function () {
        expect(testNode.getType()).toBe('NullLiteral');
      });

      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <NullLiteral vavaType: null>\n');
      });
      
    }); // end NullLiteral spec

    describe('UnaryMinus', function () {
      
      beforeEach(function () {
        testNode = new astNodes.UnaryMinus(mockASTNode({
          vavaType: 'int',
          compile : function () { return 'MOCK'; }
        }));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `UnaryMinus`', function () {
        expect(testNode.getType()).toBe('UnaryMinus');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <UnaryMinus>\n  - <ASTNode vavaType: int>\n');
      });

      it('should compile to inversion call', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.inverse()');
      });
      
    }); // end UnaryMinus spec
    
    describe('UnaryPlus', function () {
      
      beforeEach(function () {
        testNode = new astNodes.UnaryPlus(mockASTNode({vavaType: 'int'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `UnaryPlus`', function () {
        expect(testNode.getType()).toBe('UnaryPlus');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <UnaryPlus>\n  - <ASTNode vavaType: int>\n');
      });

      it('should compile to child\'s compilation', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK');
      });
      
    }); // end UnaryPlus spec
    
    describe('PostIncrement', function () {
      
      beforeEach(function () {
        testNode = new astNodes.PostIncrement(mockASTNode({vavaType: 'int'}), 1);
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `PostIncrement`', function () {
        expect(testNode.getType()).toBe('PostIncrement');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <PostIncrement>\n  - <ASTNode vavaType: int>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.postInc()');
      });
      
    }); // end PostIncrement spec

    describe('PostDecrement', function () {
      
      beforeEach(function () {
        testNode = new astNodes.PostDecrement(mockASTNode({vavaType: 'int'}), 1);
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `PostDecrement`', function () {
        expect(testNode.getType()).toBe('PostDecrement');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <PostDecrement>\n  - <ASTNode vavaType: int>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.postDec()');
      });
      
    }); // end PostDecrement spec

    describe('PreIncrement', function () {
      
      beforeEach(function () {
        testNode = new astNodes.PreIncrement(mockASTNode({vavaType: 'int'}), 1);
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `PreIncrement`', function () {
        expect(testNode.getType()).toBe('PreIncrement');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <PreIncrement>\n  - <ASTNode vavaType: int>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.preInc()');
      });
      
    }); // end PreIncrement spec

    describe('PreDecrement', function () {
      
      beforeEach(function () {
        testNode = new astNodes.PreDecrement(mockASTNode({vavaType: 'int'}), 1);
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `PreDecrement`', function () {
        expect(testNode.getType()).toBe('PreDecrement');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <PreDecrement>\n  - <ASTNode vavaType: int>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.preDec()');
      });
      
    }); // end PreDecrement spec

    describe('CastExpression', function () {
      
      beforeEach(function () {
        testNode = new astNodes.CastExpression('int', mockASTNode({
          compile : function () { return 'MOCK'; }
        }));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `CastExpression`', function () {
        expect(testNode.getType()).toBe('CastExpression');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <CastExpression vavaType: int>\n  - <ASTNode>\n');
      });

      it('should compile to child\'s compilation', function () {
        expect(testNode.compile()).toBe('(MOCK).to("int")');
      });
      
    }); // end CastExpression spec
    
    describe('Addition', function () {
      
      beforeEach(function () {
        testNode = new astNodes.Addition(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `Addition`', function () {
        expect(testNode.getType()).toBe('Addition');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <Addition>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end Addition spec
    
    describe('Subtraction', function () {
      
      beforeEach(function () {
        testNode = new astNodes.Subtraction(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `Subtraction`', function () {
        expect(testNode.getType()).toBe('Subtraction');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <Subtraction>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end Subtraction spec
    
    describe('Multiplication', function () {
      
      beforeEach(function () {
        testNode = new astNodes.Multiplication(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `Multiplication`', function () {
        expect(testNode.getType()).toBe('Multiplication');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <Multiplication>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end Multiplication spec
    
    describe('Division', function () {
      
      beforeEach(function () {
        testNode = new astNodes.Division(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `Division`', function () {
        expect(testNode.getType()).toBe('Division');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <Division>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end Division spec
    
    describe('Modulo', function () {
      
      beforeEach(function () {
        testNode = new astNodes.Modulo(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `Modulo`', function () {
        expect(testNode.getType()).toBe('Modulo');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <Modulo>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end Modulo spec
    
    describe('LessThan', function () {
      
      beforeEach(function () {
        testNode = new astNodes.LessThan(mockASTNode({vavaType: 'int'}), mockASTNode({vavaType: 'short'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `LessThan`', function () {
        expect(testNode.getType()).toBe('LessThan');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <LessThan vavaType: boolean>\n  - <ASTNode vavaType: int>\n  - <ASTNode vavaType: short>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('this.__env.BooleanValue.intern((MOCK).isLessThan(MOCK))');
      });
      
    }); // end LessThan spec
    
    describe('LessThanEqual', function () {
      
      beforeEach(function () {
        testNode = new astNodes.LessThanEqual(mockASTNode({vavaType: 'int'}), mockASTNode({vavaType: 'short'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `LessThanEqual`', function () {
        expect(testNode.getType()).toBe('LessThanEqual');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <LessThanEqual vavaType: boolean>\n  - <ASTNode vavaType: int>\n  - <ASTNode vavaType: short>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('this.__env.BooleanValue.intern((MOCK).isLessThan(MOCK) || MOCK === MOCK)');
      });
      
    }); // end LessThanEqual spec
    
    describe('Equals', function () {
      
      beforeEach(function () {
        testNode = new astNodes.Equals(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `Equals`', function () {
        expect(testNode.getType()).toBe('Equals');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <Equals vavaType: boolean>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('this.__env.BooleanValue.intern(MOCK === MOCK)');
      });
      
    }); // end Equals spec
    
    describe('GreaterThan', function () {
      
      beforeEach(function () {
        testNode = new astNodes.GreaterThan(mockASTNode({vavaType: 'int'}), mockASTNode({vavaType: 'byte'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `GreaterThan`', function () {
        expect(testNode.getType()).toBe('GreaterThan');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <GreaterThan vavaType: boolean>\n  - <ASTNode vavaType: int>\n  - <ASTNode vavaType: byte>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('this.__env.BooleanValue.intern((MOCK).isGreaterThan(MOCK))');
      });
      
    }); // end GreaterThan spec
    
    describe('GreaterThanEqual', function () {
      
      beforeEach(function () {
        testNode = new astNodes.GreaterThanEqual(mockASTNode({vavaType: 'int'}), mockASTNode({vavaType: 'short'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `GreaterThanEqual`', function () {
        expect(testNode.getType()).toBe('GreaterThanEqual');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <GreaterThanEqual vavaType: boolean>\n  - <ASTNode vavaType: int>\n  - <ASTNode vavaType: short>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('this.__env.BooleanValue.intern((MOCK).isGreaterThan(MOCK) || MOCK === MOCK)');
      });
      
    }); // end GreaterThanEqual spec
    
    describe('NotEquals', function () {
      
      beforeEach(function () {
        testNode = new astNodes.NotEquals(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `NotEquals`', function () {
        expect(testNode.getType()).toBe('NotEquals');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <NotEquals vavaType: boolean>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end NotEquals spec
    
    describe('TernaryOperator', function () {
      
      beforeEach(function () {
        testNode = new astNodes.TernaryOperator(mockASTNode({vavaType: 'boolean'}), mockASTNode({vavaType: 'int'}), mockASTNode({vavaType: 'byte'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `TernaryOperator`', function () {
        expect(testNode.getType()).toBe('TernaryOperator');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <TernaryOperator>\n  - <ASTNode vavaType: boolean>\n  - <ASTNode vavaType: int>\n  - <ASTNode vavaType: byte>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile()).toBe('((this.__env.BooleanValue.intern(true) === MOCK) ? MOCK : MOCK)');
      });
      
    }); // end TernaryOperator spec

    describe('LogicalAnd', function () {
      
      beforeEach(function () {
        testNode = new astNodes.LogicalAnd(mockASTNode({vavaType: 'boolean'}), mockASTNode({vavaType: 'boolean'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `LogicalAnd`', function () {
        expect(testNode.getType()).toBe('LogicalAnd');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <LogicalAnd vavaType: boolean>\n  - <ASTNode vavaType: boolean>\n  - <ASTNode vavaType: boolean>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile()).toBe('this.__env.BooleanValue.intern(MOCK.get() && MOCK.get())');
      });
      
    }); // end LogicalAnd spec
    
    describe('LogicalOr', function () {
      
      beforeEach(function () {
        testNode = new astNodes.LogicalOr(mockASTNode({vavaType: 'boolean'}), mockASTNode({vavaType: 'boolean'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `LogicalOr`', function () {
        expect(testNode.getType()).toBe('LogicalOr');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <LogicalOr vavaType: boolean>\n  - <ASTNode vavaType: boolean>\n  - <ASTNode vavaType: boolean>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile()).toBe('this.__env.BooleanValue.intern(MOCK.get() || MOCK.get())');
      });
      
    }); // end LogicalOr spec

    describe('InclusiveAnd', function () {
      
      beforeEach(function () {
        testNode = new astNodes.InclusiveAnd(mockASTNode({vavaType: 'boolean'}), mockASTNode({vavaType: 'boolean'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `InclusiveAnd`', function () {
        expect(testNode.getType()).toBe('InclusiveAnd');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <InclusiveAnd>\n  - <ASTNode vavaType: boolean>\n  - <ASTNode vavaType: boolean>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.and(MOCK)');
      });
      
    }); // end InclusiveAnd spec

    describe('InclusiveOr', function () {
      
      beforeEach(function () {
        testNode = new astNodes.InclusiveOr(mockASTNode({vavaType: 'boolean'}), mockASTNode({vavaType: 'boolean'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `InclusiveOr`', function () {
        expect(testNode.getType()).toBe('InclusiveOr');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <InclusiveOr>\n  - <ASTNode vavaType: boolean>\n  - <ASTNode vavaType: boolean>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.or(MOCK)');
      });
      
    }); // end InclusiveOr spec

    describe('ExclusiveOr', function () {
      
      beforeEach(function () {
        testNode = new astNodes.ExclusiveOr(mockASTNode({vavaType: 'boolean'}), mockASTNode({vavaType: 'boolean'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `ExclusiveOr`', function () {
        expect(testNode.getType()).toBe('ExclusiveOr');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <ExclusiveOr>\n  - <ASTNode vavaType: boolean>\n  - <ASTNode vavaType: boolean>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.xor(MOCK)');
      });
      
    }); // end ExclusiveOr spec

    describe('Negation', function () {
      
      beforeEach(function () {
        testNode = new astNodes.Negation(mockASTNode({vavaType: 'boolean'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `Negation`', function () {
        expect(testNode.getType()).toBe('Negation');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <Negation vavaType: boolean>\n  - <ASTNode vavaType: boolean>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.not()');
      });
      
    }); // end Negation spec
    
    describe('BitwiseNegation', function () {
      
      beforeEach(function () {
        testNode = new astNodes.BitwiseNegation(mockASTNode({vavaType: 'int'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `BitwiseNegation`', function () {
        expect(testNode.getType()).toBe('BitwiseNegation');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <BitwiseNegation>\n  - <ASTNode vavaType: int>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.bitwiseNot()');
      });
      
    }); // end BitwiseNegation spec
    
    describe('LeftShift', function () {
      
      beforeEach(function () {
        testNode = new astNodes.LeftShift(mockASTNode({vavaType: 'int'}), mockASTNode({vavaType: 'int'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `LeftShift`', function () {
        expect(testNode.getType()).toBe('LeftShift');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <LeftShift>\n  - <ASTNode vavaType: int>\n  - <ASTNode vavaType: int>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.leftshift(MOCK)');
      });
      
    }); // end LeftShift spec

    describe('RightShift', function () {
      
      beforeEach(function () {
        testNode = new astNodes.RightShift(mockASTNode({vavaType: 'int'}), mockASTNode({vavaType: 'int'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `RightShift`', function () {
        expect(testNode.getType()).toBe('RightShift');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <RightShift>\n  - <ASTNode vavaType: int>\n  - <ASTNode vavaType: int>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.rightshift(MOCK)');
      });
      
    }); // end RightShift spec

    describe('ZeroFillRightShift', function () {
      
      beforeEach(function () {
        testNode = new astNodes.ZeroFillRightShift(mockASTNode({vavaType: 'int'}), mockASTNode({vavaType: 'int'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `ZeroFillRightShift`', function () {
        expect(testNode.getType()).toBe('ZeroFillRightShift');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <ZeroFillRightShift>\n  - <ASTNode vavaType: int>\n  - <ASTNode vavaType: int>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('MOCK.zerofillRightshift(MOCK)');
      });
      
    }); // end ZeroFillRightShift spec

    describe('IfThen', function () {
      
      beforeEach(function () {
        testNode = new astNodes.IfThen(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `IfThen`', function () {
        expect(testNode.getType()).toBe('IfThen');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <IfThen>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end IfThen spec
    
    describe('IfThenElse', function () {
      
      beforeEach(function () {
        testNode = new astNodes.IfThenElse(mockASTNode(), mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `IfThenElse`', function () {
        expect(testNode.getType()).toBe('IfThenElse');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <IfThenElse>\n  - <ASTNode>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end IfThenElse spec
    
    describe('WhileLoop', function () {
      
      beforeEach(function () {
        testNode = new astNodes.WhileLoop(mockASTNode({vavaType: 'boolean'}), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `WhileLoop`', function () {
        expect(testNode.getType()).toBe('WhileLoop');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <WhileLoop>\n  - <ASTNode vavaType: boolean>\n  - <ASTNode>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('(function (blockScope) {\nwhile (this.__env.BooleanValue.intern(true) === MOCK) { (function () {\nMOCK\n}).call(blockScope); }\n}).call(this, this.__descend());');
      });
    }); // end WhileLoop spec
    
    describe('DoWhileLoop', function () {
      
      beforeEach(function () {
        testNode = new astNodes.DoWhileLoop(mockASTNode(), mockASTNode({vavaType: 'boolean'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `DoWhileLoop`', function () {
        expect(testNode.getType()).toBe('DoWhileLoop');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <DoWhileLoop>\n  - <ASTNode>\n  - <ASTNode vavaType: boolean>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('(function (freeRide, blockScope) {\nwhile (freeRide || this.__env.BooleanValue.intern(true) === MOCK) { (function () {\nMOCK\n}).call(blockScope); freeRide = false; }\n}).call(this, true, this.__descend());');
      });
      
    }); // end DoWhileLoop spec
    
    describe('ForLoop', function () {
      
      beforeEach(function () {
        testNode = new astNodes.ForLoop(mockASTNode({__mock: 'INIT'}), mockASTNode({vavaType: 'boolean', __mock: 'COND'}), mockASTNode({__mock: 'UPDATE'}), mockASTNode({__mock: 'BLOCK'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `ForLoop`', function () {
        expect(testNode.getType()).toBe('ForLoop');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <ForLoop>\n  - <ASTNode>\n  - <ASTNode vavaType: boolean>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
      it('should compile itself', function () {
        expect(testNode.compile(mockOpts())).toBe('(function (blockScope) {\nfor (INIT; this.__env.BooleanValue.intern(true) === COND; UPDATE) { (function () {\nBLOCK\n}).call(blockScope); }\n}).call(this, this.__descend());');
      });
    }); // end ForLoop spec
    
    describe('StatementExpressionList', function () {
      
      beforeEach(function () {
        testNode = new astNodes.StatementExpressionList(mockASTNode({__mock: 'MOCKA'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `StatementExpressionList`', function () {
        expect(testNode.getType()).toBe('StatementExpressionList');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <StatementExpressionList>\n  - <ASTNode>\n');
      });
      
      it('should compile itself', function () {
        testNode.appendChild(mockASTNode({__mock: 'MOCKB'}));
        testNode.appendChild(mockASTNode({__mock: 'MOCKC'}));
        expect(testNode.compile(mockOpts())).toBe('MOCKA, MOCKB, MOCKC');
      });
    }); // end StatementExpressionList spec
    
    afterEach(function () {
      testNode = null;
    });
    
  }); // end AST nodes spec
  
}); // end Compiler spec
