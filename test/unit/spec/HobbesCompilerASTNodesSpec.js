require('../../../hobbes/extensions');
var astNodes = require('../../../hobbes/compiler/ast_nodes');

describe('Compiler', function () {
  
  describe('AST nodes', function () {
    
    describe('ASTNode', function () {
      
      var simpleNode = null;
      
      beforeEach(function () {
        simpleNode = new astNodes.ASTNode();
      });
      
      it('should implement the ASTNode interface', function () {
        expect(astNodes.ASTNodeInterface.check(simpleNode)).not.toBeDefined();
      });
      
      it('should be of type `ASTNode`', function () {
        expect(simpleNode.getType()).toBe('ASTNode');
      });
      
      it('should turn itself into a string', function () {
        expect(simpleNode.toString()).toBe('- <ASTNode>\n');
      });
      
      it('should include its children in string representation', function () {
        simpleNode.appendChild(new astNodes.ASTNode());
        expect(simpleNode.toString()).toBe('- <ASTNode>\n  - <ASTNode>\n');
      });
      
    }); // end ASTNode spec
    
    describe('CompilationUnit', function () {
      
      var cUNode = null;
      
      beforeEach(function () {
        cUNode = new astNodes.CompilationUnit();
      });
      
      it('should implement ASTNodeInterface', function () {
        expect(astNodes.ASTNodeInterface.check(cUNode)).not.toBeDefined();
      });
      
      it('should be of type `CompilationUnit`', function () {
        expect(cUNode.getType()).toBe('CompilationUnit');
      });
      
      it('should turn itself into a string', function () {
        cUNode.vavaPackage = 'java.util';
        cUNode.vavaImports = ['java.foo'];
        cUNode.vavaType = {vavaClassName: "Test" };
        expect(cUNode.toString()).toBe('- <CompilationUnit vavaPackage: java.util vavaImports: java.foo>\n');
      });
      
    }); // end CompilationUnit spec
    
    describe('ClassDeclaration', function () {
      
      var cDNode = null;
      
      beforeEach(function () {
        cDNode = new astNodes.ClassDeclaration('Test');
      });
      
      it('should implement ASTNodeInterface', function () {
        expect(astNodes.ASTNodeInterface.check(cDNode)).not.toBeDefined();
      });
      
      it('should be of type `ClassDeclaration`', function () {
        expect(cDNode.getType()).toBe('ClassDeclaration');
      });
      
      it('should turn itself into a string', function () {
        expect(cDNode.toString()).toBe('- <ClassDeclaration vavaClassName: Test>\n');
      });
      
    }); // end ClassDeclaration spec
    
    describe('FieldDeclaration', function () {
      
      var fDNode = null;
      
      beforeEach(function () {
        var mockVariableDeclaration = {
          id: 'foo',
          getType: function () { return 'VariableDeclaration'; },
          // mock object is 'secret' child
          toString: function () { return ''; }
        };
        fDNode = new astNodes.FieldDeclaration('int', [mockVariableDeclaration]);
      });
      
      it('should implement ASTNodeInterface', function () {
        expect(astNodes.ASTNodeInterface.check(fDNode)).not.toBeDefined();
      });
      
      it('should be of type `FieldDeclaration`', function () {
        expect(fDNode.getType()).toBe('FieldDeclaration');
      });
      
      it('should turn itself into a string', function () {
        expect(fDNode.toString()).toBe('- <FieldDeclaration vavaType: int>\n');
      });
      
      it('should list its children', function () {
        var mockVariableDeclaration = {
          id: 'foo',
          getType: function () { return 'VariableDeclaration'; },
          toString: function () { return '  - Kiddo\n'; }
        };
        fDNode = new astNodes.FieldDeclaration('int', [mockVariableDeclaration]);
        expect(fDNode.toString()).toBe('- <FieldDeclaration vavaType: int>\n  - Kiddo\n');
      });
      
    }); // end FieldDeclaration spec
    
    describe('VariableDeclaration', function () {
      
      var vDNode = null;
      
      beforeEach(function () {
        vDNode = new astNodes.VariableDeclaration('foo', 5);
      });
      
      it('should implement ASTNodeInterface', function () {
        expect(astNodes.ASTNodeInterface.check(vDNode)).not.toBeDefined();
      });
      
      it('should be of type `VariableDeclaration`', function () {
        expect(vDNode.getType()).toBe('VariableDeclaration');
      });
      
      it('should turn itself into a string', function () {
        expect(vDNode.toString()).toBe('- <VariableDeclaration vavaIdentifier: foo>\n');
      });
      
    }); // end VariableDeclaration spec
    
  }); // end AST nodes spec
  
}); // end Compiler spec