require('../../../hobbes/extensions');
var astNodes = require('../../../hobbes/compiler/ast_nodes');

describe('Compiler', function () {
  
  describe('AST nodes', function () {
    
    var testNode = null;
    
    // Common
    function mockASTNode(properties) {
      properties = properties || {};
      var mockNode = new astNodes.ASTNode();
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
        testNode.vavaType = {vavaClassName: "Test" };
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
        expect(testNode.toString()).toBe('- <IntegerLiteral value: 0>\n');
      });
      
    }); // end IntegerLiteral spec

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
        testNode = new astNodes.Addition(mockASTNode(), mockASTNode());
      });
      
      it('should satisfy common requirements for ASTNodes', commonASTNodeTests);

      it('should be of type `Subtraction`', function () {
        expect(testNode.getType()).toBe('Subtraction');
      });
      
      it('should turn itself into a string', function () {
        expect(testNode.toString()).toBe('- <Subtraction>\n  - <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end Addition spec
    
    afterEach(function () {
      testNode = null;
    });
    
  }); // end AST nodes spec
  
}); // end Compiler spec
