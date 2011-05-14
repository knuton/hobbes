require('../../../hobbes/extensions');
var astNodes = require('../../../hobbes/compiler/ast_nodes');

describe('Compiler', function () {
  
  describe('AST nodes', function () {
    
    var testNode = null;
    
    // Common
    function mockASTNode(properties) {
      properties = properties || {};
      var mockNode = new astNodes.ASTNode();
      mockNode.compileNode = function () { return 'MOCK'; }
      for (key in properties) {
        mockNode[key] = properties[key];
      }
      return mockNode;
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
        testNode = new astNodes.MethodDeclaration({vavaType: 'int', vavaIdentifier: 'foo'}, mockASTNode({type: 'Block'}));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);
      
      it('should be of type `MethodDeclaration`', function () {
        expect(testNode.getType()).toBe('MethodDeclaration');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <MethodDeclaration vavaType: int vavaIdentifier: foo>\n  - <Block>\n');
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
      
    }); // end FormalParameter spec
    
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
        expect(testNode.toString()).toBe('- <CharLiteral character: a>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile()).toBe('this.__env.CharValue.intern("a")');
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
        expect(testNode.toString()).toBe('- <NullLiteral>\n');
      });
      
    }); // end NullLiteral spec

    describe('UnaryMinus', function () {
      
      beforeEach(function () {
        testNode = new astNodes.UnaryMinus(mockASTNode({
          compile : function () { return 'MOCK'; }
        }));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `UnaryMinus`', function () {
        expect(testNode.getType()).toBe('UnaryMinus');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <UnaryMinus>\n  - <ASTNode>\n');
      });

      it('should compile to inversion call', function () {
        expect(testNode.compile()).toBe('MOCK.inverse()');
      });
      
    }); // end UnaryMinus spec
    
    describe('UnaryPlus', function () {
      
      beforeEach(function () {
        testNode = new astNodes.UnaryPlus(mockASTNode({
          compile : function () { return 'MOCK'; }
        }));
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `UnaryPlus`', function () {
        expect(testNode.getType()).toBe('UnaryPlus');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <UnaryPlus>\n  - <ASTNode>\n');
      });

      it('should compile to child\'s compilation', function () {
        expect(testNode.compile()).toBe('MOCK');
      });
      
    }); // end UnaryPlus spec
    
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
        testNode = new astNodes.LessThan(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `LessThan`', function () {
        expect(testNode.getType()).toBe('LessThan');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <LessThan vavaType: boolean>\n  - <ASTNode>\n  - <ASTNode>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile()).toBe('this.__env.BooleanValue.intern((MOCK).isLessThan(MOCK))');
      });
      
    }); // end LessThan spec
    
    describe('Equals', function () {
      
      beforeEach(function () {
        testNode = new astNodes.Equals(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `Equals`', function () {
        expect(testNode.getType()).toBe('Equals');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <Equals>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end Equals spec
    
    describe('GreaterThan', function () {
      
      beforeEach(function () {
        testNode = new astNodes.GreaterThan(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `GreaterThan`', function () {
        expect(testNode.getType()).toBe('GreaterThan');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <GreaterThan vavaType: boolean>\n  - <ASTNode>\n  - <ASTNode>\n');
      });

      it('should compile itself', function () {
        expect(testNode.compile()).toBe('this.__env.BooleanValue.intern((MOCK).isGreaterThan(MOCK))');
      });
      
    }); // end GreaterThan spec
    
    describe('NotEquals', function () {
      
      beforeEach(function () {
        testNode = new astNodes.NotEquals(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `NotEquals`', function () {
        expect(testNode.getType()).toBe('NotEquals');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <NotEquals>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end NotEquals spec
    
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
        testNode = new astNodes.WhileLoop(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `WhileLoop`', function () {
        expect(testNode.getType()).toBe('WhileLoop');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <WhileLoop>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end IfThen spec
    
    afterEach(function () {
      testNode = null;
    });
    
  }); // end AST nodes spec
  
}); // end Compiler spec
